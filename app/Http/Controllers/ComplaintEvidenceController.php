<?php

namespace App\Http\Controllers;

use App\Http\Requests\ComplaintEvidence\StoreComplaintEvidenceRequest;
use App\Http\Requests\ComplaintEvidence\UpdateComplaintEvidenceRequest;
use App\Http\Resources\ComplaintEvidenceResource;
use App\Models\ComplaintEvidence;
use App\Support\Interfaces\Services\ComplaintEvidenceServiceInterface;
use Illuminate\Http\Request;

class ComplaintEvidenceController extends Controller {
    public function __construct(protected ComplaintEvidenceServiceInterface $complaintEvidenceService) {}

    public function index(Request $request) {
        $perPage = $request->get('perPage', 10);
        $data = ComplaintEvidenceResource::collection($this->complaintEvidenceService->getAllPaginated($request->query(), $perPage));

        if ($this->ajax()) {
            return $data;
        }

        return inertia('complaint-evidence/index');
    }

    public function create() {
        return inertia('complaint-evidence/create');
    }

    public function store(StoreComplaintEvidenceRequest $request) {
        if ($this->ajax()) {
            return $this->complaintEvidenceService->create($request->validated());
        }
    }

    public function show(ComplaintEvidence $complaintEvidence) {
        $data = ComplaintEvidenceResource::make($complaintEvidence);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('complaint-evidence/show', compact('data'));
    }

    public function edit(ComplaintEvidence $complaintEvidence) {
        $data = ComplaintEvidenceResource::make($complaintEvidence);

        return inertia('complaint-evidence/edit', compact('data'));
    }

    public function update(UpdateComplaintEvidenceRequest $request, ComplaintEvidence $complaintEvidence) {
        if ($this->ajax()) {
            return $this->complaintEvidenceService->update($complaintEvidence, $request->validated());
        }
    }

    public function destroy(ComplaintEvidence $complaintEvidence) {
        if ($this->ajax()) {
            return $this->complaintEvidenceService->delete($complaintEvidence);
        }
    }
}
