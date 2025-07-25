<?php

namespace App\Http\Requests\ComplaintEvidence;

use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class StoreComplaintEvidenceRequest extends FormRequest {
    public function rules(): array {
        $rules = [
            'complaint_id' => ['required', 'integer'],
            'title' => ['required', 'string'],
            'file_path' => ['required', 'string'],
            'file_type' => ['required', 'string'],
        ];

        // Handle custom intents if needed
        switch ($this->get('intent')) {
            case IntentEnum::CUSTOM_ACTION->value:
                // Add custom validation for specific actions
                break;
        }

        return $rules;
    }
}
