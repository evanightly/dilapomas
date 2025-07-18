<?php

namespace App\Http\Requests\Complaint;

use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateComplaintRequest extends FormRequest {
    public function rules(): array {
        $rules = [
            'reporter' => ['nullable', 'string'],
            'reporter_identity_type' => ['required', 'string'],
            'reporter_identity_number' => ['nullable', 'string'],
            'incident_title' => ['nullable', 'string'],
            'incident_description' => ['nullable', 'string'],
            'incident_time' => ['nullable', 'date_format:Y-m-d H:i:s'],
            'reported_person' => ['nullable', 'string'],
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
