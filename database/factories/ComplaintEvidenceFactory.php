<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ComplaintEvidence>
 */
class ComplaintEvidenceFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'complaint_id' => $this->faker->numberBetween(1, 1000),
            'title' => $this->faker->sentence(),
            'file_path' => $this->faker->sentence(),
            'file_type' => $this->faker->sentence(),
        ];
    }
}
