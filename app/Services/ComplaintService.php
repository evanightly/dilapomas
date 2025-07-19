<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Models\ComplaintEvidence;
use App\Repositories\ComplaintRepository;
use App\Support\Interfaces\Repositories\ComplaintRepositoryInterface;
use App\Support\Interfaces\Services\ComplaintServiceInterface;
use App\Traits\Services\HandlesPageSizeAll;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;

class ComplaintService extends BaseCrudService implements ComplaintServiceInterface {
    use HandlesPageSizeAll;

    public function getAllPaginated(array $search = [], int $pageSize = 15): LengthAwarePaginator {
        $this->handlePageSizeAll();

        return parent::getAllPaginated($search, $pageSize);
    }

    /** @var ComplaintRepository */
    protected $repository;

    protected function getRepositoryClass(): string {
        return ComplaintRepositoryInterface::class;
    }

    /**
     * Create a new complaint with evidence files
     */
    public function create(array $data): ?Model {
        // Extract evidence files if present
        $evidenceFiles = $data['evidence_files'] ?? [];
        unset($data['evidence_files']);

        // Create the complaint using parent method
        $complaint = parent::create($data);

        // Handle evidence files if provided
        if (!empty($evidenceFiles)) {
            $this->handleEvidenceFiles($complaint, $evidenceFiles);
        }

        return $complaint;
    }

    /**
     * Update complaint with evidence files
     */
    public function update(mixed $model, array $data): ?Model {
        // Extract evidence files if present
        $evidenceFiles = $data['evidence_files'] ?? [];
        unset($data['evidence_files']);

        // Update the complaint using parent method
        $complaint = parent::update($model, $data);

        // Handle evidence files if provided
        if (!empty($evidenceFiles)) {
            $this->handleEvidenceFiles($complaint, $evidenceFiles);
        }

        return $complaint;
    }

    /**
     * Handle evidence file uploads
     */
    private function handleEvidenceFiles($complaint, array $evidenceFiles): void {
        foreach ($evidenceFiles as $file) {
            if ($file instanceof UploadedFile) {
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('evidence', $filename, 'public');

                ComplaintEvidence::create([
                    'complaint_id' => $complaint->id,
                    'title' => $file->getClientOriginalName(),
                    'file_path' => $path,
                    'file_type' => $file->getClientMimeType(),
                ]);
            }
        }
    }

    /**
     * Generate a comprehensive PDF report for a complaint
     */
    public function generateReport($complaint): array {
        // Load relationships
        $complaint->load(['evidences']);

        try {
            // Generate filename
            $filename = 'RRI-Complaint-Report-' . $complaint->id . '-' . now()->format('Y-m-d') . '.pdf';

            // Generate download URL
            $downloadUrl = route('complaints.download-report', [
                'complaint' => $complaint->id,
                'filename' => $filename,
            ]);

            // Return download information
            return [
                'success' => true,
                'data' => [
                    'filename' => $filename,
                    'download_url' => $downloadUrl,
                    'content_type' => 'application/pdf',
                ],
                'message' => 'PDF report generated successfully',
            ];

        } catch (\Exception $e) {
            Log::error('PDF generation failed', [
                'complaint_id' => $complaint->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return [
                'success' => false,
                'message' => 'Failed to generate PDF report: ' . $e->getMessage(),
                'data' => null,
            ];
        }
    }

    /**
     * Generate and directly download PDF report
     */
    public function downloadReport($complaint): \Illuminate\Http\Response {
        try {
            Log::info('Starting PDF download for complaint', ['complaint_id' => $complaint->id]);
            
            // Load relationships
            $complaint->load(['evidences']);

            // Generate PDF
            $pdf = Pdf::loadView('reports.complaint-report', [
                'complaint' => $complaint,
            ]);

            // Set PDF options
            $pdf->setPaper('A4', 'portrait');
            $pdf->setOptions([
                'isHtml5ParserEnabled' => true,
                'isPhpEnabled' => true,
                'defaultFont' => 'DejaVu Sans',
                'dpi' => 150,
            ]);

            // Generate filename
            $filename = 'RRI-Complaint-Report-' . $complaint->id . '-' . now()->format('Y-m-d') . '.pdf';
            
            Log::info('PDF generated successfully', [
                'complaint_id' => $complaint->id,
                'filename' => $filename
            ]);

            // Return PDF download response
            return $pdf->download($filename);
            
        } catch (\Exception $e) {
            Log::error('PDF download failed', [
                'complaint_id' => $complaint->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response('PDF generation failed', 500);
        }
    }
}
