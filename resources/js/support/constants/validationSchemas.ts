import { z } from 'zod';

export const complaintValidationSchema = z.object({
    reporter: z.string().min(2, 'Nama pelapor minimal 2 karakter').max(255, 'Nama pelapor maksimal 255 karakter'),

    reporter_identity_type: z.enum(['KTP', 'SIM', 'PASSPORT'], {
        message: 'Pilih jenis identitas',
    }),

    reporter_identity_number: z.string().min(1, 'Nomor identitas harus diisi'),

    incident_title: z.string().min(5, 'Judul kejadian minimal 5 karakter').max(255, 'Judul kejadian maksimal 255 karakter'),

    incident_description: z.string().min(20, 'Deskripsi kejadian minimal 20 karakter').max(2000, 'Deskripsi kejadian maksimal 2000 karakter'),

    incident_time: z
        .date({
            message: 'Waktu kejadian harus diisi',
        })
        .max(new Date(), 'Waktu kejadian tidak boleh di masa depan'),

    reported_person: z.string().max(255, 'Nama terlapor maksimal 255 karakter').optional().or(z.literal('')),

    evidence_files: z.array(z.instanceof(File)).max(5, 'Maksimal 5 file bukti').optional(),
});

export type ComplaintFormData = z.infer<typeof complaintValidationSchema>;

// Additional validation for different identity types
export const validateIdentityNumber = (type: string, number: string): boolean => {
    switch (type) {
        case 'KTP':
            return /^\d{16}$/.test(number);
        case 'SIM':
            return /^\d{12}$/.test(number);
        case 'PASSPORT':
            return /^[A-Z]\d{7}$/.test(number);
        default:
            return false;
    }
};
