<?php

use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('complaints', ComplaintController::class)->except(['store']);
    Route::resource('users', UserController::class)->parameters(['users' => 'nip']);
});

// Public PDF download route (outside auth middleware)
Route::get('complaints/{complaint}/download-report/{filename}', [ComplaintController::class, 'downloadReport'])->name('complaints.download-report');

// Test route for PDF generation debugging
Route::get('test-pdf/{complaint}', function(App\Models\Complaint $complaint) {
    return response()->json([
        'message' => 'PDF test route accessible',
        'complaint_id' => $complaint->id,
        'complaint_title' => $complaint->title,
    ]);
});

Route::resource('complaints', ComplaintController::class)->only(['store']);

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

Route::resource('complaint-evidences', App\Http\Controllers\ComplaintEvidenceController::class);
