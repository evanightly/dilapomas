import { Complaint } from '@/support/interfaces/models';
import { Resource } from '@/support/interfaces/resources';

export interface ComplaintResource extends Resource, Complaint {}
