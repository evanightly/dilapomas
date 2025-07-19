<?php

namespace App\Http\Controllers;

use App\Http\Requests\Complaint\StoreComplaintRequest;
use App\Http\Requests\Complaint\UpdateComplaintRequest;
use App\Http\Resources\ComplaintResource;
use App\Models\Complaint;
use App\Support\Enums\IntentEnum;
use App\Support\Interfaces\Services\ComplaintServiceInterface;
use Illuminate\Http\Request;

class ComplaintController extends Controller {
    public function __construct(protected ComplaintServiceInterface $complaintService) {}

    public function index(Request $request) {
        $data = ComplaintResource::collection($this->complaintService->getAllPaginated($request->query()));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('complaint/index');
    }

    public function create() {
        return inertia('complaint/create');
    }

    public function store(StoreComplaintRequest $request) {
        $intent = request()->get('intent');

        if ($intent === IntentEnum::SUBMIT_PUBLIC_COMPLAINT->value) {
            $result = $this->complaintService->create($request->validated());

            if ($this->ajax()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Pengaduan berhasil dikirim',
                    'data' => $result,
                ]);
            }

            return redirect()->route('home')->with('success', 'Pengaduan berhasil dikirim. Nomor tiket: ' . $result['ticket_number']);
        }

        if ($this->ajax()) {
            return $this->complaintService->create($request->validated());
        }
    }

    public function show(Complaint $complaint) {
        $intent = request()->get('intent');
        $data = ComplaintResource::make($complaint->load('evidences'));
        if ($this->ajax()) {
            if ($intent === IntentEnum::GENERATE_COMPLAINT_REPORT->value) {
                $result = $this->complaintService->generateReport($complaint);

                return response()->json($result);
            }

            return $data;
        }

        return inertia('complaint/show', compact('data'));
    }

    public function edit(Complaint $complaint) {
        $data = ComplaintResource::make($complaint->load('evidences'));

        return inertia('complaint/edit', compact('data'));
    }

    public function update(UpdateComplaintRequest $request, Complaint $complaint) {
        if ($this->ajax()) {
            return $this->complaintService->update($complaint, $request->validated());
        }
    }

    public function destroy(Complaint $complaint) {
        if ($this->ajax()) {
            return $this->complaintService->delete($complaint);
        }
    }

    public function storePublic(StoreComplaintRequest $request) {
        $result = $this->complaintService->create($request->validated());

        if ($result['success']) {
            return redirect()->route('home')->with('success', 'Pengaduan berhasil dikirim. Nomor tiket: ' . $result['data']['ticket_number']);
        }

        return redirect()->back()->withInput()->withErrors($result['errors'] ?? 'Terjadi kesalahan saat mengirim pengaduan.');
    }

    /**
     * Download PDF report for a complaint
     */
    public function downloadReport(Complaint $complaint, $filename) {
        return $this->complaintService->downloadReport($complaint);
    }
}
