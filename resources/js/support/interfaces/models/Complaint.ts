import { Model } from './Model';

/**
 * Complaint model interface
 */
export interface Complaint extends Model {
    reporter?: string;
    reporter_identity_type: string;
    reporter_identity_number?: string;
    incident_title?: string;
    incident_description?: string;
    incident_time?: string;
    reported_person?: string;
}
