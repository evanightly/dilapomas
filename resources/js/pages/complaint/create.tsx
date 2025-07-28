import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload } from '@/components/ui/file-upload';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { complaintServiceHook } from '@/services/complaintServiceHook';
import { type BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, FileText, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const complaintSchema = z.object({
    reporter: z.string().min(1, 'Reporter name is required'),
    reporter_email: z.string().email('Invalid email address').optional().or(z.literal('')),
    reporter_phone_number: z
        .string()
        .min(1, 'Phone number is required')
        .refine((val) => {
            // If user manually adds +62, show validation error
            if (val.startsWith('+62')) {
                return false;
            }
            // Check if it's a valid Indonesian phone number (8-12 digits)
            return /^[0-9]{8,12}$/.test(val);
        }, 'Enter phone number without country code (+62). Example: 81234567890'),
    reporter_identity_type: z.enum(['KTP', 'SIM', 'Passport', 'Other']),
    reporter_identity_number: z.string().min(1, 'Identity number is required'),
    incident_title: z.string().min(1, 'Incident title is required'),
    incident_description: z.string().min(1, 'Incident description is required'),
    incident_time: z.string().min(1, 'Incident time is required'),
    reported_person: z.string().min(1, 'Reported person is required'),
    evidence_files: z.array(z.instanceof(File)).optional(),
});

type ComplaintFormData = z.infer<typeof complaintSchema>;

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Complaints',
        href: '/complaints',
    },
    {
        title: 'Create Complaint',
        href: '/complaints/create',
    },
];

export default function CreateComplaint() {
    const createComplaint = complaintServiceHook.useCreate();

    const form = useForm<ComplaintFormData>({
        resolver: zodResolver(complaintSchema),
        defaultValues: {
            reporter: '',
            reporter_email: '',
            reporter_phone_number: '',
            reporter_identity_type: 'KTP',
            reporter_identity_number: '',
            incident_title: '',
            incident_description: '',
            incident_time: '',
            reported_person: '',
            evidence_files: [],
        },
    });

    const onSubmit = async (data: ComplaintFormData) => {
        // Add +62 prefix to phone number when submitting
        const formDataWithPrefix = {
            ...data,
            reporter_phone_number: data.reporter_phone_number ? `+62${data.reporter_phone_number}` : '',
        };

        createComplaint.mutate(
            { data: formDataWithPrefix },
            {
                onSuccess: () => {
                    toast.success('Complaint created successfully!');
                    router.visit(route('complaints.index'));
                },
                onError: (error: any) => {
                    if (error.response?.data?.errors) {
                        Object.entries(error.response.data.errors).forEach(([field, messages]: [string, any]) => {
                            form.setError(field as keyof ComplaintFormData, {
                                message: Array.isArray(messages) ? messages[0] : messages,
                            });
                        });
                    }
                    toast.error('Please check the form for errors');
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Create Complaint' />

            <div className='space-y-6'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                        <Button className='gap-2' onClick={() => router.visit(route('complaints.index'))} variant='ghost'>
                            <ArrowLeft className='h-4 w-4' />
                            Back to Complaints
                        </Button>
                        <div>
                            <h1 className='text-foreground text-2xl font-bold'>Create New Complaint</h1>
                            <p className='text-muted-foreground'>Add a new complaint to the system</p>
                        </div>
                    </div>
                </div>

                <Card className='max-w-4xl'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <FileText className='h-5 w-5' />
                            Complaint Information
                        </CardTitle>
                        <CardDescription>Enter the details for the new complaint</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                    <FormField
                                        control={form.control}
                                        name='reporter'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Reporter Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder='Enter reporter name' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name='reporter_email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder='Enter email address' type='email' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                    <FormField
                                        control={form.control}
                                        name='reporter_phone_number'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number *</FormLabel>
                                                <FormControl>
                                                    <div className='relative'>
                                                        <div className='absolute top-0 left-0 flex h-full items-center'>
                                                            <span className='bg-muted text-muted-foreground border-border flex h-full items-center rounded-l border-r px-3 py-2 text-sm font-medium'>
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

                                    <FormField
                                        control={form.control}
                                        name='reporter_identity_type'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Identity Type</FormLabel>
                                                <Select defaultValue={field.value} onValueChange={field.onChange}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder='Select identity type' />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value='KTP'>KTP</SelectItem>
                                                        <SelectItem value='SIM'>SIM</SelectItem>
                                                        <SelectItem value='Passport'>Passport</SelectItem>
                                                        <SelectItem value='Other'>Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                    <FormField
                                        control={form.control}
                                        name='reporter_identity_number'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Identity Number</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder='Enter identity number' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name='incident_time'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Incident Time</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type='datetime-local' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name='incident_title'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Incident Title</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder='Enter incident title' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='reported_person'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Reported Person</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder='Enter reported person name' />
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
                                            <FormLabel>Incident Description</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} className='min-h-[120px]' placeholder='Describe the incident in detail...' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='evidence_files'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Evidence Files (Optional)</FormLabel>
                                            <FormControl>
                                                <FileUpload
                                                    disabled={createComplaint.isPending}
                                                    maxFiles={5}
                                                    onChange={(files) => field.onChange(files)}
                                                    value={field.value}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className='flex items-center space-x-4 pt-4'>
                                    <Button className='gap-2' disabled={createComplaint.isPending} type='submit'>
                                        {createComplaint.isPending ? (
                                            <>
                                                <div className='h-4 w-4 animate-spin rounded-full border-b-2 border-white'></div>
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <Save className='h-4 w-4' />
                                                Create Complaint
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        disabled={createComplaint.isPending}
                                        onClick={() => router.visit(route('complaints.index'))}
                                        type='button'
                                        variant='outline'
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
