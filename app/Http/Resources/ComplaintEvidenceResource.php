<?php

namespace App\Http\Resources;

use App\Traits\Resources\JsonResource\HandlesResourceDataSelection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComplaintEvidenceResource extends JsonResource {
    use HandlesResourceDataSelection;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        $dataSource = [
            'id' => $this->id,
            'complaint_id' => $this->complaint_id,
            'title' => $this->title,
            'file_path' => $this->file_path,
            'file_type' => $this->file_type,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'complaint' => new ComplaintResource($this->whenLoaded('complaint')),
        ];

        return $this->filterData($request, $dataSource);
    }
}
