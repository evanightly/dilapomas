import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { complaintServiceHook } from '@/services/complaintServiceHook';
import { ComplaintResource } from '@/support/interfaces/resources';
import { AlertCircle, CheckCircle, Clock, Flag, Settings } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ComplaintStatusManagerProps {
    complaint: ComplaintResource;
    onUpdate?: () => void;
}

export function ComplaintStatusManager({ complaint, onUpdate }: ComplaintStatusManagerProps) {
    const [status, setStatus] = useState(complaint.status || 'pending');
    const [priority, setPriority] = useState(complaint.priority || 'medium');
    const [isUpdating, setIsUpdating] = useState(false);

    const updateComplaintMutation = complaintServiceHook.useUpdate();

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return <Clock className='h-4 w-4' />;
            case 'in_progress':
                return <Settings className='h-4 w-4' />;
            case 'resolved':
                return <CheckCircle className='h-4 w-4' />;
            case 'rejected':
                return <AlertCircle className='h-4 w-4' />;
            default:
                return <Clock className='h-4 w-4' />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'in_progress':
                return 'bg-blue-100 text-blue-800';
            case 'resolved':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'low':
                return 'bg-green-100 text-green-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'high':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleUpdate = async () => {
        const currentStatus = complaint.status || 'pending';
        const currentPriority = complaint.priority || 'medium';

        if (status === currentStatus && priority === currentPriority) {
            toast.info('Tidak ada perubahan yang dilakukan');
            return;
        }

        setIsUpdating(true);
        try {
            await updateComplaintMutation.mutateAsync({
                id: complaint.id,
                data: {
                    status,
                    priority,
                    // reporter: complaint.reporter,
                    // reporter_identity_type: complaint.reporter_identity_type,
                    // reporter_identity_number: complaint.reporter_identity_number,
                    // incident_title: complaint.incident_title,
                    // incident_description: complaint.incident_description,
                    // incident_time: complaint.incident_time,
                    // reported_person: complaint.reported_person,
                },
            });

            toast.success('Status dan prioritas berhasil diperbarui');
            onUpdate?.();
        } catch (error) {
            console.error('Error updating complaint:', error);
            toast.error('Gagal memperbarui status dan prioritas');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                    <Settings className='h-5 w-5' />
                    Kelola Status & Prioritas
                </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
                {/* Status Saat Ini */}
                <div className='space-y-2'>
                    <label className='text-sm font-medium'>Status Saat Ini</label>
                    <div className='flex items-center gap-2'>
                        <Badge variant='secondary' className={getStatusColor(complaint.status || 'pending')}>
                            {getStatusIcon(complaint.status || 'pending')}
                            <span className='ml-2 capitalize'>
                                {(complaint.status || 'pending')
                                    .replace('_', ' ')
                                    .replace('pending', 'Menunggu')
                                    .replace('in progress', 'Sedang Diproses')
                                    .replace('resolved', 'Selesai')
                                    .replace('rejected', 'Ditolak')}
                            </span>
                        </Badge>
                        <Badge variant='secondary' className={getPriorityColor(complaint.priority || 'medium')}>
                            <Flag className='h-4 w-4' />
                            <span className='ml-2 capitalize'>
                                {(complaint.priority || 'medium')
                                    .replace('low', 'Rendah')
                                    .replace('medium', 'Sedang')
                                    .replace('high', 'Tinggi')}
                            </span>
                        </Badge>
                    </div>
                </div>

                {/* Pilih Status */}
                <div className='space-y-2'>
                    <label className='text-sm font-medium'>Ubah Status</label>
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                            <SelectValue placeholder='Pilih status' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='pending'>
                                <div className='flex items-center gap-2'>
                                    <Clock className='h-4 w-4' />
                                    Menunggu
                                </div>
                            </SelectItem>
                            <SelectItem value='in_progress'>
                                <div className='flex items-center gap-2'>
                                    <Settings className='h-4 w-4' />
                                    Sedang Diproses
                                </div>
                            </SelectItem>
                            <SelectItem value='resolved'>
                                <div className='flex items-center gap-2'>
                                    <CheckCircle className='h-4 w-4' />
                                    Selesai
                                </div>
                            </SelectItem>
                            <SelectItem value='rejected'>
                                <div className='flex items-center gap-2'>
                                    <AlertCircle className='h-4 w-4' />
                                    Ditolak
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Pilih Prioritas */}
                <div className='space-y-2'>
                    <label className='text-sm font-medium'>Ubah Prioritas</label>
                    <Select value={priority} onValueChange={setPriority}>
                        <SelectTrigger>
                            <SelectValue placeholder='Pilih prioritas' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='low'>
                                <div className='flex items-center gap-2'>
                                    <Flag className='h-4 w-4 text-green-600' />
                                    Rendah
                                </div>
                            </SelectItem>
                            <SelectItem value='medium'>
                                <div className='flex items-center gap-2'>
                                    <Flag className='h-4 w-4 text-yellow-600' />
                                    Sedang
                                </div>
                            </SelectItem>
                            <SelectItem value='high'>
                                <div className='flex items-center gap-2'>
                                    <Flag className='h-4 w-4 text-red-600' />
                                    Tinggi
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Tombol Perbarui */}
                <Button
                    onClick={handleUpdate}
                    disabled={isUpdating || (status === complaint.status && priority === complaint.priority)}
                    className='w-full'
                >
                    {isUpdating ? 'Memperbarui...' : 'Perbarui Status & Prioritas'}
                </Button>
            </CardContent>
        </Card>
    );
}
