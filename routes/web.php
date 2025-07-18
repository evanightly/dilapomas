<?php

use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::resource('complaints', ComplaintController::class)->except(['store']);
    Route::resource('users', UserController::class)->parameters(['users' => 'nip']);
});

Route::resource('complaints', ComplaintController::class)->only(['store']);

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

Route::resource('complaint-evidences', App\Http\Controllers\ComplaintEvidenceController::class);
