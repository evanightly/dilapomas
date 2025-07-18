<?php

namespace App\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\BaseCrudService;
use App\Models\ComplaintEvidence;
use App\Repositories\ComplaintRepository;
use App\Support\Interfaces\Repositories\ComplaintRepositoryInterface;
use App\Support\Interfaces\Services\ComplaintServiceInterface;
use App\Traits\Services\HandlesPageSizeAll;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

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
}
