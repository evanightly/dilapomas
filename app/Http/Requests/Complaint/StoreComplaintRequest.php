<?php

namespace App\Http\Requests\Complaint;

use App\Rules\Complaint\KTPValidation;
use App\Rules\Complaint\PassportValidation;
use App\Rules\Complaint\SIMValidation;
use App\Support\Enums\IntentEnum;
use Illuminate\Foundation\Http\FormRequest;

class StoreComplaintRequest extends FormRequest {
    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        $rules = [
            'reporter' => ['required', 'string', 'min:2', 'max:255'],
            'reporter_identity_type' => ['required', 'in:KTP,SIM,PASSPORT'],
            'reporter_identity_number' => ['required', 'string'],
            'incident_title' => ['required', 'string', 'min:5', 'max:255'],
            'incident_description' => ['required', 'string', 'min:20', 'max:2000'],
            'incident_time' => ['required', 'date', 'before_or_equal:now'],
            'reported_person' => ['nullable', 'string', 'max:255'],
            'evidence_files' => ['nullable', 'array', 'max:5'],
            'evidence_files.*' => ['file', 'mimes:jpg,jpeg,png,mp4,pdf', 'max:102400'], // 100MB max
        ];

        // Handle specific identity validation based on type
        $identityType = request()->get('reporter_identity_type');
        switch ($identityType) {
            case 'KTP':
                $rules['reporter_identity_number'][] = new KTPValidation;
                break;
            case 'SIM':
                $rules['reporter_identity_number'][] = new SIMValidation;
                break;
            case 'PASSPORT':
                $rules['reporter_identity_number'][] = new PassportValidation;
                break;
        }

        // Handle custom intents if needed
        switch (request()->get('intent')) {
            case IntentEnum::SUBMIT_PUBLIC_COMPLAINT->value:
                // Additional validation for public submissions
                $rules['reporter_identity_number'][] = 'unique:complaints,reporter_identity_number';
                break;
        }

        return $rules;
    }

    public function messages(): array {
        return [
            'reporter.required' => 'Nama pelapor harus diisi.',
            'reporter.min' => 'Nama pelapor minimal 2 karakter.',
            'reporter.max' => 'Nama pelapor maksimal 255 karakter.',
            'reporter_identity_type.required' => 'Jenis identitas harus dipilih.',
            'reporter_identity_type.in' => 'Jenis identitas tidak valid.',
            'reporter_identity_number.required' => 'Nomor identitas harus diisi.',
            'reporter_identity_number.unique' => 'Nomor identitas sudah pernah digunakan untuk pengaduan sebelumnya.',
            'incident_title.required' => 'Judul kejadian harus diisi.',
            'incident_title.min' => 'Judul kejadian minimal 5 karakter.',
            'incident_title.max' => 'Judul kejadian maksimal 255 karakter.',
            'incident_description.required' => 'Deskripsi kejadian harus diisi.',
            'incident_description.min' => 'Deskripsi kejadian minimal 20 karakter.',
            'incident_description.max' => 'Deskripsi kejadian maksimal 2000 karakter.',
            'incident_time.required' => 'Waktu kejadian harus diisi.',
            'incident_time.before_or_equal' => 'Waktu kejadian tidak boleh di masa depan.',
            'reported_person.max' => 'Nama terlapor maksimal 255 karakter.',
            'evidence_files.array' => 'File bukti harus berupa array.',
            'evidence_files.max' => 'Maksimal 5 file bukti dapat diunggah.',
            'evidence_files.*.file' => 'File bukti harus berupa file yang valid.',
            'evidence_files.*.mimes' => 'File bukti harus berformat JPG, PNG, MP4, atau PDF.',
            'evidence_files.*.max' => 'Ukuran file bukti maksimal 10MB.',
        ];
    }
}
