<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable {
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'nip';

    /**
     * Indicates if the model's ID is auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The data type of the auto-incrementing ID.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nip',
        'name',
        'phone_number',
        'email',
        'home_address',
        'role',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Role constants
     */
    const ROLE_SUPER_ADMIN = 'SuperAdmin';

    const ROLE_EMPLOYEE = 'Employee';

    /**
     * Check if user is super admin
     */
    public function isSuperAdmin(): bool {
        return $this->role === self::ROLE_SUPER_ADMIN;
    }

    /**
     * Check if user is employee
     */
    public function isEmployee(): bool {
        return $this->role === self::ROLE_EMPLOYEE;
    }

    /**
     * Get all available roles
     */
    public static function getRoles(): array {
        return [
            self::ROLE_SUPER_ADMIN,
            self::ROLE_EMPLOYEE,
        ];
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
