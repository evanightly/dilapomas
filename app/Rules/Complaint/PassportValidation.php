<?php

namespace App\Rules\Complaint;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class PassportValidation implements ValidationRule {
    /**
     * Run the validation rule.
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        // Indonesian passport format: 1 letter + 7 digits (e.g., A1234567) or C + 7 digits
        if (!preg_match('/^[A-Z]\d{7}$/', $value)) {
            $fail('Nomor Paspor harus berformat 1 huruf kapital diikuti 7 digit angka (contoh: A1234567).');

            return;
        }

        // Check for common invalid patterns
        if (preg_match('/^[A-Z]0{7}$/', $value)) {
            $fail('Nomor Paspor tidak valid.');

            return;
        }
    }
}
