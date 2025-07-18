<?php

namespace App\Support\Enums;

/**
 * Enum for system permissions
 *
 * @generated Laravel Forgemate Initializer
 */
enum PermissionEnum: string {
    // Users Management
    case USER_CREATE = 'user-create';
    case USER_READ = 'user-read';
    case USER_UPDATE = 'user-update';
    case USER_DELETE = 'user-delete';

    // Permissions Management
    case PERMISSION_CREATE = 'permission-create';
    case PERMISSION_READ = 'permission-read';
    case PERMISSION_UPDATE = 'permission-update';
    case PERMISSION_DELETE = 'permission-delete';

    // Roles Management
    case ROLE_CREATE = 'role-create';
    case ROLE_READ = 'role-read';
    case ROLE_UPDATE = 'role-update';
    case ROLE_DELETE = 'role-delete';

    // Complaint permissions
    case COMPLAINT_READ = 'complaint.read';
    case COMPLAINT_CREATE = 'complaint.create';
    case COMPLAINT_UPDATE = 'complaint.update';
    case COMPLAINT_DELETE = 'complaint.delete';

    // ComplaintEvidence permissions
    case COMPLAINT_EVIDENCE_READ = 'complaintevidence.read';
    case COMPLAINT_EVIDENCE_CREATE = 'complaintevidence.create';
    case COMPLAINT_EVIDENCE_UPDATE = 'complaintevidence.update';
    case COMPLAINT_EVIDENCE_DELETE = 'complaintevidence.delete';

    // Add your model permissions here
}
