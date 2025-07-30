<?php

namespace App\Models;

use App\Observers\ComplaintObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[ObservedBy([ComplaintObserver::class])]
class Complaint extends Model {
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'complaint_number',
        'reporter',
        'reporter_email',
        'reporter_phone_number',
        'reporter_identity_type',
        'reporter_identity_number',
        'incident_title',
        'incident_description',
        'incident_time',
        'reported_person',
        'status',
        'priority',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'incident_time' => 'datetime',
    ];

    /**
     * hasMany relationship with ComplaintEvidence.
     */
    public function evidences() {
        return $this->hasMany(ComplaintEvidence::class);
    }
}
