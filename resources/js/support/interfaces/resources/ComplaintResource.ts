import { Complaint, ComplaintEvidence } from '@/support/interfaces/models';
import { Resource } from '@/support/interfaces/resources';

export interface ComplaintResource extends Resource, Complaint {
    evidences?: ComplaintEvidence[];
}
