import { Model } from './Model';

/**
 * ComplaintEvidence model interface
 */
export interface ComplaintEvidence extends Model {
    complaint_id: number;
    title: string;
    file_path: string;
    file_type: string;
}
