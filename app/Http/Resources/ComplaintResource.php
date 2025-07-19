<?php

namespace App\Http\Resources;

use App\Traits\Resources\JsonResource\HandlesResourceDataSelection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComplaintResource extends JsonResource {
    use HandlesResourceDataSelection;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        $dataSource = [
            'id' => $this->id,
            'reporter' => $this->reporter,
            'reporter_identity_type' => $this->reporter_identity_type,
            'reporter_identity_number' => $this->reporter_identity_number,
            'incident_title' => $this->incident_title,
            'incident_description' => $this->incident_description,
            'incident_time' => $this->incident_time,
            'reported_person' => $this->reported_person,
            'status' => $this->status,
            'priority' => $this->priority,
            'evidences' => ComplaintEvidenceResource::collection($this->whenLoaded('evidences')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];

        return $this->filterData($request, $dataSource);
    }
}
