<?php

namespace App\Models;

use App\Observers\ComplaintEvidenceObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[ObservedBy([ComplaintEvidenceObserver::class])]
class ComplaintEvidence extends Model {
    use HasFactory;

    protected $table = 'complaint_evidences';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'complaint_id', 'title', 'file_path', 'file_type',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [

    ];

    /**
     * belongsTo relationship with Complaint.
     */
    public function complaint() {
        return $this->belongsTo(Complaint::class);
    }
}
