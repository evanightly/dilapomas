import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Confetti } from '@/components/ui/confetti';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { complaintServiceHook } from '@/services/complaintServiceHook';
import { complaintValidationSchema, validateIdentityNumber, type ComplaintFormData } from '@/support/constants/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { CalendarIcon, CheckCircle, Copy, FileText, Printer, SendHorizontal, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'sonner';
import { ComplaintPrintTemplate } from './ComplaintPrintTemplate';

interface ComplaintFormProps {
    className?: string;
}

export function ComplaintForm({ className }: ComplaintFormProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [submittedComplaintNumber, setSubmittedComplaintNumber] = useState<string>('');
    const [submittedFormData, setSubmittedFormData] = useState<ComplaintFormData | null>(null);
    const [submittedFiles, setSubmittedFiles] = useState<File[]>([]);
    const submitComplaintMutation = complaintServiceHook.useSubmitPublicComplaint();
    const printRef = useRef<HTMLDivElement>(null);

    const form = useForm<ComplaintFormData>({
        resolver: zodResolver(complaintValidationSchema),
        defaultValues: {
            reporter: '',
            reporter_email: '',
            reporter_phone_number: '',
            reporter_identity_type: 'KTP',
            reporter_identity_number: '',
            incident_title: '',
            incident_description: '',
            incident_time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // yesterday
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
            formData.append('reporter_email', data.reporter_email || '');
            // Add +62 prefix to phone number when submitting
            const phoneNumber = data.reporter_phone_number ? `+62${data.reporter_phone_number}` : '';
            formData.append('reporter_phone_number', phoneNumber);
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

            const response = await submitComplaintMutation.mutateAsync(formData);

            // Extract complaint number from response if available
            const complaintNumber = response?.data?.data?.complaint_number || 'N/A';
            setSubmittedComplaintNumber(complaintNumber);

            // Store form data and files for printing
            setSubmittedFormData(data);
            setSubmittedFiles([...files]); // Store files before clearing

            // Show success modal instead of toast
            setShowSuccessModal(true);
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

    const handlePrintComplaint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Laporan Pengaduan - ${submittedComplaintNumber}`,
        onAfterPrint: () => {
            setShowSuccessModal(false);
            toast.success('Laporan berhasil dicetak!');
        },
    });

    const handleCopyComplaintNumber = async () => {
        if (!submittedComplaintNumber || submittedComplaintNumber === 'N/A') return;

        try {
            await navigator.clipboard.writeText(submittedComplaintNumber);
            toast.success('Nomor pengaduan berhasil disalin ke clipboard!');
        } catch (error) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = submittedComplaintNumber;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            toast.success('Nomor pengaduan berhasil disalin ke clipboard!');
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

                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <FormField
                                control={form.control}
                                name='reporter_email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email (Opsional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Masukkan alamat email' type='email' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='reporter_phone_number'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nomor Telepon *</FormLabel>
                                        <FormControl>
                                            <div className='relative'>
                                                <div className='absolute top-0 left-0 flex h-full items-center'>
                                                    <span className='bg-muted text-muted-foreground border-border flex h-full items-center rounded-l-md border-r px-3 py-2 text-sm font-medium'>
                                                        +62
                                                    </span>
                                                </div>
                                                <Input {...field} className='pl-16' placeholder='81234567890' />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div>
                            {/* <FormField
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
                            /> */}

                            <FormField
                                control={form.control}
                                name='reporter_identity_number'
                                render={({ field }) => (
                                    <FormItem className='w-full'>
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
                                        accept='image/*,video/mp4,.mp4,audio/mp3,.mp3,audio/wav,.wav,audio/flac,.flac,audio/aac,.aac,audio/ogg,.ogg,application/pdf,.doc,.docx'
                                        onChange={handleFileChange}
                                        className='absolute inset-0 cursor-pointer opacity-0'
                                        disabled={files.length >= 5}
                                    />
                                </Button>
                                <span className='text-muted-foreground text-sm'>Maksimal 5 file (gambar, video, audio, PDF, atau dokumen)</span>
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
                                Komplen
                            </>
                        )}
                    </Button>
                </form>
            </Form>

            {/* Success Modal */}
            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent className='sm:max-w-lg'>
                    {/* Confetti effect */}
                    {showSuccessModal && <Confetti className='absolute top-0 left-0 z-0 size-full' />}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        <DialogHeader className='text-center'>
                            <motion.div
                                className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900'
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
                            >
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 150 }}
                                >
                                    <CheckCircle className='h-8 w-8 text-green-600 dark:text-green-400' />
                                </motion.div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
                                <DialogTitle className='text-center text-xl font-semibold text-green-800 dark:text-green-200'>
                                    Laporan Berhasil Dikirim!
                                </DialogTitle>
                            </motion.div>
                        </DialogHeader>
                        <DialogDescription />

                        {/* Content section with proper semantic structure */}
                        <motion.div
                            className='space-y-3 pt-2 text-center'
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                        >
                            <p className='text-muted-foreground text-base'>Terima kasih atas partisipasi Anda dalam melaporkan masalah ini.</p>

                            {submittedComplaintNumber && submittedComplaintNumber !== 'N/A' && (
                                <motion.div
                                    className='rounded-lg border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-green-50 p-4 dark:border-blue-800 dark:from-blue-950 dark:to-green-950'
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.6 }}
                                >
                                    <p className='mb-2 text-sm font-medium text-blue-700 dark:text-blue-300'>Nomor Pengaduan Anda:</p>
                                    <div className='mb-2 flex items-center justify-center gap-2'>
                                        <p className='font-mono text-2xl font-bold tracking-wider text-blue-900 dark:text-blue-100'>
                                            {submittedComplaintNumber}
                                        </p>
                                        <Button
                                            variant='ghost'
                                            size='sm'
                                            className='h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-800'
                                            onClick={handleCopyComplaintNumber}
                                        >
                                            <Copy className='h-4 w-4 text-blue-600 dark:text-blue-400' />
                                        </Button>
                                    </div>
                                    <p className='text-xs text-blue-600 dark:text-blue-400'>Simpan nomor ini sebagai referensi</p>
                                </motion.div>
                            )}

                            <p className='text-muted-foreground text-sm'>
                                Tim kami akan meninjau laporan Anda dan memberikan tindak lanjut sesuai dengan prosedur yang berlaku.
                            </p>
                        </motion.div>
                        <motion.div
                            className='flex justify-center gap-3 pt-4'
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.7 }}
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    onClick={handlePrintComplaint}
                                    className='bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600'
                                    disabled={!submittedFormData}
                                >
                                    <Printer className='mr-2 h-4 w-4' />
                                    Cetak Laporan
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    onClick={() => setShowSuccessModal(false)}
                                    variant='outline'
                                    className='border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800'
                                >
                                    <X className='mr-2 h-4 w-4' />
                                    Tutup
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </DialogContent>
            </Dialog>

            {/* Hidden Print Template */}
            <div style={{ display: 'none' }}>
                {submittedFormData && (
                    <ComplaintPrintTemplate
                        ref={printRef}
                        complaintNumber={submittedComplaintNumber}
                        formData={submittedFormData}
                        files={submittedFiles}
                    />
                )}
            </div>
        </div>
    );
}
