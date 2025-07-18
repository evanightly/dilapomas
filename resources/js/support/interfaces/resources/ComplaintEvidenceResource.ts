import { ComplaintEvidence } from '@/support/interfaces/models';
import { Resource } from '@/support/interfaces/resources';
import { ComplaintResource } from './ComplaintResource';

export interface ComplaintEvidenceResource extends Resource, ComplaintEvidence {
    complaint?: ComplaintResource;
    file?: string;
}
