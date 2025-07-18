<?php

namespace App\Observers;

use App\Models\ComplaintEvidence;

class ComplaintEvidenceObserver {
    /**
     * Handle the ComplaintEvidence "created" event.
     */
    public function created(ComplaintEvidence $complaintEvidence): void {
        $this->setFileType($complaintEvidence);
    }

    /**
     * Handle the ComplaintEvidence "updated" event.
     */
    public function updated(ComplaintEvidence $complaintEvidence): void {
        $this->setFileType($complaintEvidence);
    }

    /**
     * Determine and set the file type based on file extension
     */
    private function setFileType(ComplaintEvidence $complaintEvidence): void {
        // Only set file_type if it's null or empty
        if (empty($complaintEvidence->file_type)) {
            $fileExtension = strtolower(pathinfo($complaintEvidence->file_path, PATHINFO_EXTENSION));

            $mimeType = match ($fileExtension) {
                'jpg', 'jpeg' => 'image/jpeg',
                'png' => 'image/png',
                'gif' => 'image/gif',
                'bmp' => 'image/bmp',
                'webp' => 'image/webp',
                'svg' => 'image/svg+xml',
                'mp4' => 'video/mp4',
                'avi' => 'video/x-msvideo',
                'mov' => 'video/quicktime',
                'wmv' => 'video/x-ms-wmv',
                'flv' => 'video/x-flv',
                'webm' => 'video/webm',
                'mkv' => 'video/x-matroska',
                'm4v' => 'video/mp4',
                'mp3' => 'audio/mpeg',
                'wav' => 'audio/wav',
                'flac' => 'audio/flac',
                'aac' => 'audio/aac',
                'ogg' => 'audio/ogg',
                'wma' => 'audio/x-ms-wma',
                'pdf' => 'application/pdf',
                'doc' => 'application/msword',
                'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'xls' => 'application/vnd.ms-excel',
                'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'ppt' => 'application/vnd.ms-powerpoint',
                'pptx' => 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                'txt' => 'text/plain',
                'zip' => 'application/zip',
                'rar' => 'application/vnd.rar',
                '7z' => 'application/x-7z-compressed',
                default => 'application/octet-stream'
            };

            // Update without triggering observer again
            $complaintEvidence->updateQuietly(['file_type' => $mimeType]);
        }
    }

    /**
     * Handle the ComplaintEvidence "deleted" event.
     */
    public function deleted(ComplaintEvidence $complaintEvidence): void {
        //
    }

    /**
     * Handle the ComplaintEvidence "restored" event.
     */
    public function restored(ComplaintEvidence $complaintEvidence): void {
        //
    }

    /**
     * Handle the ComplaintEvidence "force deleted" event.
     */
    public function forceDeleted(ComplaintEvidence $complaintEvidence): void {
        //
    }
}
