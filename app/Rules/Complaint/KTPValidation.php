<?php

namespace App\Rules\Complaint;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class KTPValidation implements ValidationRule {
    /**
     * Run the validation rule.
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        // KTP must be exactly 16 digits
        if (!preg_match('/^\d{16}$/', $value)) {
            $fail('Nomor KTP harus terdiri dari 16 digit angka.');

            return;
        }

        // Basic KTP validation - check for obvious invalid patterns
        if (preg_match('/^(\d)\1{15}$/', $value)) {
            $fail('Nomor KTP tidak valid - tidak boleh semua digit sama.');

            return;
        }

        // Check if it's all zeros
        if ($value === '0000000000000000') {
            $fail('Nomor KTP tidak valid.');

            return;
        }
    }
}
