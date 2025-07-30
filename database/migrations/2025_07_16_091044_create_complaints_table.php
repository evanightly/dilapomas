<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('complaints', function (Blueprint $table) {
            $table->id();
            $table->string('complaint_number')->unique()->nullable();
            $table->string('reporter')->nullable();
            $table->string('reporter_email')->nullable();
            $table->string('reporter_phone_number')->nullable();
            $table->text('reporter_identity_type');
            $table->string('reporter_identity_number')->nullable();
            $table->string('incident_title')->nullable();
            $table->text('incident_description')->nullable();
            $table->datetime('incident_time')->nullable();
            $table->string('reported_person')->nullable();
            $table->enum('status', ['pending', 'in_progress', 'resolved', 'rejected'])->default('pending');
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('complaints');
    }
};
