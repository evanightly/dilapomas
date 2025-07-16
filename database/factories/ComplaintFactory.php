<?php

namespace Database\Factories;

use App\Models\Complaint;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Complaint>
 */
class ComplaintFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'reporter' => $this->faker->sentence(),
            'reporter_identity_type' => $this->faker->paragraphs(3, true),
            'reporter_identity_number' => $this->faker->sentence(),
            'incident_title' => $this->faker->sentence(),
            'incident_description' => $this->faker->paragraphs(3, true),
            'incident_time' => $this->faker->dateTimeThisMonth()->format('Y-m-d H:i:s'),
            'reported_person' => $this->faker->sentence(),
        ];
    }
}
