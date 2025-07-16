<?php

namespace App\Http\Controllers;

use App\Http\Requests\Complaint\StoreComplaintRequest;
use App\Http\Requests\Complaint\UpdateComplaintRequest;
use App\Http\Resources\ComplaintResource;
use App\Models\Complaint;
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
        if ($this->ajax()) {
            return $this->complaintService->create($request->validated());
        }
    }

    public function show(Complaint $complaint) {
        $data = ComplaintResource::make($complaint);

        if ($this->ajax()) {
            return $data;
        }

        return inertia('complaint/show', compact('data'));
    }

    public function edit(Complaint $complaint) {
        $data = ComplaintResource::make($complaint);

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
}
