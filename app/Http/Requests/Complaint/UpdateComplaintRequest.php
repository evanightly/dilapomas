<?php

namespace App\Http\Requests\Complaint;

use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateComplaintRequest extends FormRequest {
    public function rules(): array {
        $rules = [
            'reporter' => ['nullable', 'string'],
            'reporter_identity_type' => ['nullable', 'string'],
            'reporter_identity_number' => ['nullable', 'string'],
            'incident_title' => ['nullable', 'string'],
            'incident_description' => ['nullable', 'string'],
            'incident_time' => ['nullable', 'date_format:Y-m-d H:i:s'],
            'reported_person' => ['nullable', 'string'],
            'evidence_files' => ['nullable', 'array', 'max:5'],
            'evidence_files.*' => ['file', 'mimes:jpg,jpeg,png,mp4,pdf', 'max:10240'], // 10MB max
            'status' => ['nullable', 'string'],
            'priority' => ['nullable', 'string'],
        ];

        // Handle custom intents if needed
        switch (request()->get('intent')) {
            case IntentEnum::CUSTOM_ACTION->value:
                // Add custom validation for specific actions
                break;
        }

        return $rules;
    }
}
