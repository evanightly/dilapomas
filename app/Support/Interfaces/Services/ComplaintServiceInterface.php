<?php

namespace App\Support\Interfaces\Services;

use Adobrovolsky97\LaravelRepositoryServicePattern\Services\Contracts\BaseCrudServiceInterface;
use App\Models\Complaint;

interface ComplaintServiceInterface extends BaseCrudServiceInterface {
    public function generateReport(Complaint $complaint): array;

    public function downloadReport(Complaint $complaint): \Illuminate\Http\Response;
}
