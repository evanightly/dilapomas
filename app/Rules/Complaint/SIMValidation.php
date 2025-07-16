<?php

namespace App\Rules\Complaint;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class SIMValidation implements ValidationRule {
    /**
     * Run the validation rule.
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        // SIM format: 12 digits for Indonesian SIM
        if (!preg_match('/^\d{12}$/', $value)) {
            $fail('Nomor SIM harus terdiri dari 12 digit angka.');

            return;
        }

        // Check for obvious invalid patterns
        if (preg_match('/^(\d)\1{11}$/', $value)) {
            $fail('Nomor SIM tidak valid - tidak boleh semua digit sama.');

            return;
        }

        // Check if it's all zeros
        if ($value === '000000000000') {
            $fail('Nomor SIM tidak valid.');

            return;
        }
    }
}
