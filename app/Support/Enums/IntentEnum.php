<?php

namespace App\Support\Enums;

/**
 * Enum for custom actions in controllers
 *
 * @generated Laravel Forgemate Initializer
 */
enum IntentEnum: string {
    case CUSTOM_ACTION = 'custom.action';
    case SUBMIT_PUBLIC_COMPLAINT = 'submit.public.complaint';
    case GENERATE_COMPLAINT_REPORT = 'generate.complaint.report';

    // Add your custom intents here
}
