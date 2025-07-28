import { ComplaintStatusManager } from '@/components/complaint/ComplaintStatusManager';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExistingEvidenceList } from '@/components/ui/existing-evidence-list';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { complaintServiceHook } from '@/services/complaintServiceHook';
import { ComplaintResource } from '@/support/interfaces/resources';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowLeft,
    Calendar,
    CheckCircle,
    Clock,
    Copy,
    Download,
    Edit3,
    Eye,
    FileText,
    Mail,
    Phone,
    Shield,
    User,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ShowComplaintProps {
    data: ComplaintResource;
}

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
        title: 'Complaint Details',
        href: '',
    },
];

export default function ShowComplaint({ data: complaint }: ShowComplaintProps) {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const generateReportMutation = complaintServiceHook.useGenerateReport();

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'in_progress':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'resolved':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return <Clock className='h-4 w-4' />;
            case 'in_progress':
                return <AlertCircle className='h-4 w-4' />;
            case 'resolved':
                return <CheckCircle className='h-4 w-4' />;
            case 'rejected':
                return <XCircle className='h-4 w-4' />;
            default:
                return <Eye className='h-4 w-4' />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority?.toLowerCase()) {
            case 'high':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return 'Not specified';
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
    };

    const handleEdit = () => {
        router.visit(route('complaints.edit', complaint.id));
    };

    const handleGenerateReport = async () => {
        try {
            const result = await generateReportMutation.mutateAsync({ id: complaint.id });

            if (result.data.success && result.data.data.download_url) {
                // Create a temporary link to download the PDF
                const link = document.createElement('a');
                link.href = result.data.data.download_url;
                link.download = result.data.data.filename;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                toast.success(`PDF report generated successfully! File: ${result.data.data.filename}`);
            } else {
                throw new Error(result.message || 'Failed to generate report');
            }
        } catch (error) {
            console.error('Error generating report:', error);
            toast.error('Failed to generate PDF report. Please try again.');
        }
    };

    const truncateDescription = (text: string, maxLength: number = 200) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Complaint Details - ${complaint.incident_title}`} />

            <div className='space-y-6'>
                {/* Header Section */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                        <Button className='gap-2' onClick={() => router.visit(route('complaints.index'))} variant='ghost'>
                            <ArrowLeft className='h-4 w-4' />
                            Back to Complaints
                        </Button>
                        <div>
                            <h1 className='text-foreground text-3xl font-bold'>Complaint Details</h1>
                            <p className='text-muted-foreground mt-1'>Complete information about this complaint</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Button className='gap-2' onClick={handleGenerateReport} variant='outline'>
                            <Download className='h-4 w-4' />
                            Generate PDF Report
                        </Button>
                        <Button className='gap-2' onClick={handleEdit}>
                            <Edit3 className='h-4 w-4' />
                            Edit Complaint
                        </Button>
                    </div>
                </div>

                {/* Status and Priority Overview */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                    <Card className='border-l-4 border-l-blue-500'>
                        <CardContent className='p-4'>
                            <div className='flex items-center gap-2'>
                                <Shield className='h-5 w-5 text-blue-600' />
                                <div>
                                    <p className='text-foreground/80 text-sm font-medium'>Complaint ID</p>
                                    <div className='flex items-center gap-2'>
                                        <p className='text-foreground text-lg font-bold'>#{complaint.id}</p>
                                        <Button
                                            className='h-6 w-6 p-0'
                                            onClick={() => copyToClipboard(complaint.id.toString())}
                                            size='sm'
                                            variant='ghost'
                                        >
                                            <Copy className='h-3 w-3' />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='border-l-4 border-l-green-500'>
                        <CardContent className='p-4'>
                            <div className='flex items-center gap-2'>
                                <Calendar className='h-5 w-5 text-green-600' />
                                <div>
                                    <p className='text-foreground/80 text-sm font-medium'>Created</p>
                                    <p className='text-foreground text-lg font-bold'>{formatDate(complaint.created_at)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='border-l-4 border-l-purple-500'>
                        <CardContent className='p-4'>
                            <div className='flex items-center gap-2'>
                                <AlertCircle className='h-5 w-5 text-purple-600' />
                                <div>
                                    <p className='text-foreground/80 text-sm font-medium'>Status</p>
                                    <Badge className={`${getStatusColor(complaint.status || 'pending')} mt-1 flex items-center gap-1`}>
                                        {getStatusIcon(complaint.status || 'pending')}
                                        {complaint.status || 'Pending'}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='border-l-4 border-l-orange-500'>
                        <CardContent className='p-4'>
                            <div className='flex items-center gap-2'>
                                <Clock className='h-5 w-5 text-orange-600' />
                                <div>
                                    <p className='text-foreground/80 text-sm font-medium'>Priority</p>
                                    <Badge className={`${getPriorityColor(complaint.priority || 'medium')} mt-1`}>
                                        {complaint.priority || 'Medium'}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                    {/* Left Column - Main Content */}
                    <div className='space-y-6 lg:col-span-2'>
                        {/* Incident Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-2'>
                                    <FileText className='h-5 w-5' />
                                    Incident Information
                                </CardTitle>
                                <CardDescription>Details about the reported incident</CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <div>
                                    <label className='text-foreground/70 text-sm font-semibold'>Incident Title</label>
                                    <p className='text-foreground mt-1 text-lg font-medium'>{complaint.incident_title}</p>
                                </div>

                                <Separator />

                                <div>
                                    <label className='text-foreground/70 text-sm font-semibold'>Incident Description</label>
                                    <div className='text-foreground mt-1 leading-relaxed'>
                                        {showFullDescription ? (
                                            <>
                                                <p className='whitespace-pre-wrap'>{complaint.incident_description}</p>
                                                <Button
                                                    className='mt-2 text-blue-600 hover:text-blue-800'
                                                    onClick={() => setShowFullDescription(false)}
                                                    size='sm'
                                                    variant='ghost'
                                                >
                                                    Show Less
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <p className='whitespace-pre-wrap'>{truncateDescription(complaint.incident_description || '')}</p>
                                                {(complaint.incident_description?.length || 0) > 200 && (
                                                    <Button
                                                        className='mt-2 text-blue-600 hover:text-blue-800'
                                                        onClick={() => setShowFullDescription(true)}
                                                        size='sm'
                                                        variant='ghost'
                                                    >
                                                        Read More
                                                    </Button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>

                                <Separator />

                                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                    <div>
                                        <label className='text-foreground/70 text-sm font-semibold'>Incident Time</label>
                                        <p className='text-foreground mt-1 flex items-center gap-2'>
                                            <Clock className='text-foreground/50 h-4 w-4' />
                                            {complaint.incident_time ? formatDate(complaint.incident_time) : 'Not specified'}
                                        </p>
                                    </div>

                                    <div>
                                        <label className='text-foreground/70 text-sm font-semibold'>Reported Person</label>
                                        <p className='text-foreground mt-1 flex items-center gap-2'>
                                            <User className='text-foreground/50 h-4 w-4' />
                                            {complaint.reported_person || 'Not specified'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Evidence Files */}
                        {complaint.evidences && complaint.evidences.length > 0 && <ExistingEvidenceList evidences={complaint.evidences} />}
                    </div>

                    {/* Right Column - Reporter Information */}
                    <div className='space-y-6'>
                        {/* Reporter Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-2'>
                                    <User className='h-5 w-5' />
                                    Reporter Information
                                </CardTitle>
                                <CardDescription>Details about the person who reported this incident</CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <div>
                                    <label className='text-foreground/70 text-sm font-semibold'>Reporter Name</label>
                                    <p className='text-foreground mt-1 font-medium'>{complaint.reporter}</p>
                                </div>

                                <Separator />

                                <div className='grid grid-cols-1 gap-4'>
                                    <div>
                                        <label className='text-foreground/70 text-sm font-semibold'>Email</label>
                                        <div className='mt-1 flex items-center gap-2'>
                                            <Mail className='text-foreground/50 h-4 w-4' />
                                            {complaint.reporter_email ? (
                                                <>
                                                    <span className='text-foreground font-mono'>{complaint.reporter_email}</span>
                                                    <Button
                                                        className='h-6 w-6 p-0'
                                                        onClick={() => copyToClipboard(complaint.reporter_email || '')}
                                                        size='sm'
                                                        variant='ghost'
                                                    >
                                                        <Copy className='h-3 w-3' />
                                                    </Button>
                                                </>
                                            ) : (
                                                <span className='text-foreground/50 italic'>Not provided</span>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className='text-foreground/70 text-sm font-semibold'>Phone Number</label>
                                        <div className='mt-1 flex items-center gap-2'>
                                            <Phone className='text-foreground/50 h-4 w-4' />
                                            {complaint.reporter_phone_number ? (
                                                <>
                                                    <span className='text-foreground font-mono'>{complaint.reporter_phone_number}</span>
                                                    <Button
                                                        className='h-6 w-6 p-0'
                                                        onClick={() => copyToClipboard(complaint.reporter_phone_number || '')}
                                                        size='sm'
                                                        variant='ghost'
                                                    >
                                                        <Copy className='h-3 w-3' />
                                                    </Button>
                                                </>
                                            ) : (
                                                <span className='text-foreground/50 italic'>Not provided</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <label className='text-foreground/70 text-sm font-semibold'>Identity Type</label>
                                    <Badge className='mt-1 block w-fit' variant='outline'>
                                        {complaint.reporter_identity_type}
                                    </Badge>
                                </div>

                                <div>
                                    <label className='text-foreground/70 text-sm font-semibold'>Identity Number</label>
                                    <div className='mt-1 flex items-center gap-2'>
                                        <p className='text-foreground font-mono'>{complaint.reporter_identity_number}</p>
                                        <Button
                                            className='h-6 w-6 p-0'
                                            onClick={() => copyToClipboard(complaint.reporter_identity_number || '')}
                                            size='sm'
                                            variant='ghost'
                                        >
                                            <Copy className='h-3 w-3' />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timeline */}
                        <Card>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-2'>
                                    <Clock className='h-5 w-5' />
                                    Timeline
                                </CardTitle>
                                <CardDescription>Complaint activity timeline</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='space-y-4'>
                                    <div className='flex items-start gap-3'>
                                        <div className='mt-2 h-2 w-2 rounded-full bg-blue-500'></div>
                                        <div>
                                            <p className='text-foreground text-sm font-medium'>Complaint Created</p>
                                            <p className='text-foreground/50 text-xs'>{formatDate(complaint.created_at)}</p>
                                        </div>
                                    </div>

                                    {complaint.updated_at !== complaint.created_at && (
                                        <div className='flex items-start gap-3'>
                                            <div className='mt-2 h-2 w-2 rounded-full bg-green-500'></div>
                                            <div>
                                                <p className='text-foreground text-sm font-medium'>Last Updated</p>
                                                <p className='text-foreground/50 text-xs'>{formatDate(complaint.updated_at)}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Status Manager */}
                        <ComplaintStatusManager
                            complaint={complaint}
                            onUpdate={() => {
                                // Refresh the page to get updated data
                                router.reload();
                            }}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
