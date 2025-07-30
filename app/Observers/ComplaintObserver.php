<?php

namespace App\Observers;

use App\Models\Complaint;

class ComplaintObserver {
    /**
     * Handle the Complaint "created" event.
     */
    public function created(Complaint $complaint): void {
        // Generate complaint number in format: YYYYMMDD-{ID}
        // IDs 1-9999 will be padded (0001-9999), IDs 10000+ will use natural length
        if (empty($complaint->complaint_number)) {
            $date = now()->format('Ymd');
            $complaint->complaint_number = $date . '-' . str_pad($complaint->id, 4, '0', STR_PAD_LEFT);
            $complaint->save();
        }
    }

    /**
     * Handle the Complaint "updated" event.
     */
    public function updated(Complaint $complaint): void {
        //
    }

    /**
     * Handle the Complaint "deleted" event.
     */
    public function deleted(Complaint $complaint): void {
        //
    }

    /**
     * Handle the Complaint "restored" event.
     */
    public function restored(Complaint $complaint): void {
        //
    }

    /**
     * Handle the Complaint "force deleted" event.
     */
    public function forceDeleted(Complaint $complaint): void {
        //
    }
}
