import { Resource } from './Resource';

export interface UserResource extends Resource {
    nip: string;
    name: string;
    phone_number?: string;
    email: string;
    home_address: string;
    role: 'SuperAdmin' | 'Employee';
    is_super_admin: boolean;
    is_employee: boolean;
}
