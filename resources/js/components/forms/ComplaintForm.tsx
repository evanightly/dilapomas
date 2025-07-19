import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { complaintServiceHook } from '@/services/complaintServiceHook';
import { complaintValidationSchema, validateIdentityNumber, type ComplaintFormData } from '@/support/constants/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { CalendarIcon, FileText, SendHorizontal, Upload } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface ComplaintFormProps {
    className?: string;
}

export function ComplaintForm({ className }: ComplaintFormProps) {
    const [files, setFiles] = useState<File[]>([]);
    const submitComplaintMutation = complaintServiceHook.useSubmitPublicComplaint();

    const form = useForm<ComplaintFormData>({
        resolver: zodResolver(complaintValidationSchema),
        defaultValues: {
            reporter: '',
            reporter_identity_type: 'KTP',
            reporter_identity_number: '',
            incident_title: '',
            incident_description: '',
            incident_time: new Date(),
            reported_person: '',
            evidence_files: [],
        },
    });

    const watchedIdentityType = form.watch('reporter_identity_type');
    const watchedIdentityNumber = form.watch('reporter_identity_number');

    // Custom validation for identity number based on type
    const validateAndSetIdentityNumber = (value: string) => {
        form.setValue('reporter_identity_number', value);

        if (value && !validateIdentityNumber(watchedIdentityType, value)) {
            let errorMessage = '';
            switch (watchedIdentityType) {
                case 'KTP':
                    errorMessage = 'Nomor KTP harus 16 digit angka';
                    break;
                case 'SIM':
                    errorMessage = 'Nomor SIM harus 12 digit angka';
                    break;
                case 'PASSPORT':
                    errorMessage = 'Nomor Paspor harus 1 huruf kapital diikuti 7 digit angka';
                    break;
            }
            form.setError('reporter_identity_number', { message: errorMessage });
        } else {
            form.clearErrors('reporter_identity_number');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (selectedFiles.length + files.length > 5) {
            toast.error('Maksimal 5 file dapat diunggah');
            return;
        }

        const newFiles = [...files, ...selectedFiles];
        setFiles(newFiles);
        form.setValue('evidence_files', newFiles);
    };

    const removeFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        form.setValue('evidence_files', newFiles);
    };

    const onSubmit = async (data: ComplaintFormData) => {
        try {
            const formData = new FormData();

            // Append form fields
            formData.append('reporter', data.reporter);
            formData.append('reporter_identity_type', data.reporter_identity_type);
            formData.append('reporter_identity_number', data.reporter_identity_number);
            formData.append('incident_title', data.incident_title);
            formData.append('incident_description', data.incident_description);
            formData.append('incident_time', data.incident_time?.toISOString() || '');
            formData.append('reported_person', data.reported_person || '');

            // Append files
            files.forEach((file, index) => {
                formData.append(`evidence_files[${index}]`, file);
            });

            await submitComplaintMutation.mutateAsync(formData);

            toast.success('Laporan berhasil dikirim! Terima kasih atas partisipasi Anda.');
            form.reset();
            setFiles([]);
        } catch (error: any) {
            console.error('Error submitting complaint:', error);

            // Handle validation errors from server
            if (error?.response?.data?.errors) {
                const serverErrors = error.response.data.errors;
                Object.entries(serverErrors).forEach(([field, messages]) => {
                    const message = Array.isArray(messages) ? messages[0] : messages;
                    form.setError(field as keyof ComplaintFormData, { message: message as string });
                });
                toast.error('Terdapat kesalahan dalam form. Silakan periksa kembali.');
            } else {
                toast.error('Terjadi kesalahan saat mengirim laporan. Silakan coba lagi.');
            }
        }
    };

    const getIdentityPlaceholder = () => {
        switch (watchedIdentityType) {
            case 'KTP':
                return 'Contoh: 3201234567890123';
            case 'SIM':
                return 'Contoh: 320123456789';
            case 'PASSPORT':
                return 'Contoh: A1234567';
            default:
                return '';
        }
    };

    return (
        <div className={cn('bg-background border-border mx-auto max-w-2xl rounded-xl border p-6 shadow-lg', className)}>
            <div className='mb-6'>
                <h2 className='text-foreground mb-2 flex items-center gap-2 text-2xl font-bold'>
                    <FileText className='text-primary h-6 w-6' />
                    Form Pengaduan
                </h2>
                <p className='text-muted-foreground'>Sampaikan laporan Anda dengan lengkap dan jelas. Semua data akan dijaga kerahasiaannya.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    {/* Reporter Information */}
                    <div className='space-y-4'>
                        <h3 className='text-foreground border-border border-b pb-2 text-lg font-semibold'>Informasi Pelapor</h3>

                        <FormField
                            control={form.control}
                            name='reporter'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Lengkap *</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Masukkan nama lengkap Anda' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='grid grid-cols-1 items-start gap-4 md:grid-cols-2'>
                            <FormField
                                control={form.control}
                                name='reporter_identity_type'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Jenis Identitas *</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Pilih jenis identitas' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='KTP'>KTP</SelectItem>
                                                <SelectItem value='SIM'>SIM</SelectItem>
                                                <SelectItem value='PASSPORT'>Paspor</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='reporter_identity_number'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nomor Identitas *</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={getIdentityPlaceholder()}
                                                {...field}
                                                onChange={(e) => validateAndSetIdentityNumber(e.target.value)}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {watchedIdentityType === 'KTP' && 'Masukkan 16 digit nomor KTP'}
                                            {watchedIdentityType === 'SIM' && 'Masukkan 12 digit nomor SIM'}
                                            {watchedIdentityType === 'PASSPORT' && 'Masukkan nomor paspor (1 huruf + 7 angka)'}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Incident Information */}
                    <div className='space-y-4'>
                        <h3 className='text-foreground border-border border-b pb-2 text-lg font-semibold'>Informasi Kejadian</h3>

                        <FormField
                            control={form.control}
                            name='incident_title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Judul Kejadian *</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Ringkasan singkat kejadian yang dilaporkan' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='incident_description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deskripsi Kejadian *</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder='Jelaskan secara detail kejadian yang Anda laporkan...'
                                            className='min-h-32'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Minimal 20 karakter. Semakin detail informasi yang Anda berikan, semakin mudah kami menindaklanjuti laporan
                                        Anda.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <FormField
                                control={form.control}
                                name='incident_time'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col'>
                                        <FormLabel>Waktu Kejadian *</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant='outline'
                                                        className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                                                    >
                                                        {field.value ? format(field.value, 'PPP', { locale: id }) : <span>Pilih tanggal</span>}
                                                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className='w-auto p-0' align='start'>
                                                <Calendar
                                                    mode='single'
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='reported_person'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Terlapor (Opsional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Nama orang yang dilaporkan (jika ada)' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Evidence Files */}
                    <div className='space-y-4'>
                        <h3 className='text-foreground border-border border-b pb-2 text-lg font-semibold'>Bukti Pendukung (Opsional)</h3>

                        <div className='space-y-3'>
                            <div className='flex items-center gap-4'>
                                <Button type='button' variant='outline' size='sm' className='relative' disabled={files.length >= 5}>
                                    <Upload className='mr-2 h-4 w-4' />
                                    Pilih File
                                    <input
                                        type='file'
                                        multiple
                                        accept='image/*,video/mp4,.mp4,application/pdf,.doc,.docx'
                                        onChange={handleFileChange}
                                        className='absolute inset-0 cursor-pointer opacity-0'
                                        disabled={files.length >= 5}
                                    />
                                </Button>
                                <span className='text-muted-foreground text-sm'>Maksimal 5 file (gambar, video, PDF, atau dokumen)</span>
                            </div>

                            {files.length > 0 && (
                                <div className='space-y-2'>
                                    {files.map((file, index) => (
                                        <div key={index} className='border-border flex items-center justify-between rounded border p-2'>
                                            <span className='truncate text-sm'>{file.name}</span>
                                            <Button
                                                type='button'
                                                variant='ghost'
                                                size='sm'
                                                onClick={() => removeFile(index)}
                                                className='text-destructive hover:text-destructive'
                                            >
                                                Hapus
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <Button type='submit' className='w-full' disabled={submitComplaintMutation.isPending} size='lg'>
                        {submitComplaintMutation.isPending ? (
                            'Mengirim...'
                        ) : (
                            <>
                                <SendHorizontal className='mr-2 h-4 w-4' />
                                Kirim Laporan
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
