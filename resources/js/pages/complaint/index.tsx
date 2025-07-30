import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/data-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { useConfirmation } from '@/contexts/confirmation-dialog-context';
import AppLayout from '@/layouts/app-layout';
import { complaintServiceHook } from '@/services/complaintServiceHook';
import { ROUTES } from '@/support/constants/routes';
import { TANSTACK_QUERY_KEYS } from '@/support/constants/tanstackQueryKeys';
import { ServiceFilterOptions } from '@/support/interfaces/others';
import { ComplaintResource } from '@/support/interfaces/resources';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Calendar, Edit, Eye, Plus, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

interface Props {
    data: {
        data: ComplaintResource[];
        meta: any;
    };
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
];

export default function ComplaintIndex({ data }: Props) {
    const confirmAction = useConfirmation();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        page_size: 10,
        sort_by: 'created_at',
    });
    const complaints = complaintServiceHook.useGetAll({
        filters,
    });
    const deleteComplaint = complaintServiceHook.useDelete();
    const [selectedComplaints, setSelectedComplaints] = useState<ComplaintResource[]>([]);
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const columnHelper = createColumnHelper<ComplaintResource>();

    const handleBulkDelete = () => {
        if (selectedComplaints.length === 0) return;

        confirmAction(() => {
            selectedComplaints.forEach((complaint) => {
                deleteComplaint.mutate(
                    { id: complaint.id },
                    {
                        onSuccess: () => {
                            toast.success('Complaints deleted successfully');
                        },
                        onError: () => {
                            toast.error('Failed to delete some complaints');
                        },
                    },
                );
            });
            setSelectedComplaints([]);
            setRowSelection({});
        });
    };

    // Sync TanStack row selection with component state
    useEffect(() => {
        if (!data?.data) return;

        const selectedRows = Object.keys(rowSelection)
            .filter((key) => rowSelection[key])
            .map((id) => data.data.find((complaint) => complaint.id.toString() === id))
            .filter(Boolean) as ComplaintResource[];

        setSelectedComplaints(selectedRows);
    }, [rowSelection, data?.data]);

    const handleSingleDelete = useCallback(
        (id: number) => {
            confirmAction(() => {
                deleteComplaint.mutate(
                    { id },
                    {
                        onSuccess: () => {
                            toast.success('Complaint deleted successfully');
                        },
                        onError: () => {
                            toast.error('Failed to delete complaint');
                        },
                    },
                );
            });
        },
        [confirmAction, deleteComplaint],
    );

    const handleEdit = useCallback((id: number) => {
        router.visit(route('complaints.edit', id));
    }, []);

    const handleView = useCallback((id: number) => {
        router.visit(route('complaints.show', id));
    }, []);

    // DataTable columns
    const memoizedColumns = useMemo(
        () =>
            [
                // Checkbox column for row selection
                columnHelper.display({
                    id: 'select',
                    header: ({ table }) => (
                        <Checkbox
                            aria-label='Select all'
                            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        />
                    ),
                    cell: ({ row }) => (
                        <Checkbox aria-label='Select row' checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} />
                    ),
                    enableSorting: false,
                    enableHiding: false,
                    size: 40,
                }),
                columnHelper.accessor('complaint_number', {
                    header: ({ column }) => <DataTableColumnHeader column={column} title='Nomor Pengaduan' />,
                    cell: ({ row }) => <div className='font-mono text-sm'>{row.original.complaint_number || `#${row.original.id}`}</div>,
                    size: 120,
                }),
                columnHelper.accessor('reporter', {
                    header: ({ column }) => <DataTableColumnHeader column={column} title='Reporter' />,
                    cell: ({ row }) => (
                        <div className='flex w-[200px] items-center gap-2 overflow-ellipsis whitespace-break-spaces'>
                            <Avatar className='h-8 w-8'>
                                <AvatarFallback className='text-xs'>{row.original.reporter?.charAt(0).toUpperCase() || 'A'}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className='line-clamp-1 font-medium'>{row.original.reporter || 'Anonymous'}</div>
                                <div className='text-muted-foreground line-clamp-1 text-xs'>{row.original.reporter_identity_type}</div>
                            </div>
                        </div>
                    ),
                }),
                columnHelper.accessor('incident_title', {
                    header: ({ column }) => <DataTableColumnHeader column={column} title='Title' />,
                    cell: ({ row }) => (
                        <div className='max-w-[200px]'>
                            <div className='truncate font-medium'>{row.original.incident_title}</div>
                            <div className='text-muted-foreground truncate text-xs'>{row.original.incident_description}</div>
                        </div>
                    ),
                }),
                columnHelper.accessor('reported_person', {
                    header: ({ column }) => <DataTableColumnHeader column={column} title='Reported Person' />,
                    cell: ({ row }) => <div className='text-sm'>{row.original.reported_person || 'N/A'}</div>,
                }),
                columnHelper.accessor('incident_time', {
                    header: ({ column }) => <DataTableColumnHeader column={column} title='Incident Date' />,
                    cell: ({ row }) => (
                        <div className='flex items-center gap-1 text-sm'>
                            <Calendar className='h-3 w-3' />
                            {row.original.incident_time ? format(new Date(row.original.incident_time), 'dd MMM yyyy') : 'N/A'}
                        </div>
                    ),
                }),
                columnHelper.accessor('created_at', {
                    header: ({ column }) => <DataTableColumnHeader column={column} title='Submitted' />,
                    cell: ({ row }) => (
                        <div className='text-muted-foreground text-xs'>
                            {row.original.created_at ? format(new Date(row.original.created_at), 'dd MMM yyyy HH:mm') : 'N/A'}
                        </div>
                    ),
                }),
                columnHelper.display({
                    id: 'actions',
                    header: 'Actions',
                    cell: ({ row }) => (
                        <div className='flex items-center space-x-2'>
                            <Button className='h-8 w-8' onClick={() => handleView(row.original.id)} size='icon' title='View details' variant='ghost'>
                                <Eye className='h-4 w-4' />
                            </Button>
                            <Button
                                className='h-8 w-8'
                                onClick={() => handleEdit(row.original.id)}
                                size='icon'
                                title='Edit complaint'
                                variant='ghost'
                            >
                                <Edit className='h-4 w-4' />
                            </Button>
                            <Button
                                className='text-destructive hover:text-destructive h-8 w-8'
                                onClick={() => handleSingleDelete(row.original.id)}
                                size='icon'
                                title='Delete complaint'
                                variant='ghost'
                            >
                                <Trash2 className='h-4 w-4' />
                            </Button>
                        </div>
                    ),
                    enableSorting: false,
                    size: 120,
                }),
            ] as Array<ColumnDef<ComplaintResource, ComplaintResource>>,
        [columnHelper, handleView, handleEdit, handleSingleDelete],
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Pengelolaan Pengaduan' />

            <div className='space-y-6'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='text-foreground text-2xl font-bold'>Layanan Pengaduan</h1>
                        <p className='text-muted-foreground'>Laporan pengaduan yang masuk</p>
                    </div>
                    <Button className='gap-2' onClick={() => router.visit(route('complaints.create'))}>
                        <Plus className='h-4 w-4' />
                        Tambah pengaduan
                    </Button>
                </div>

                {selectedComplaints.length > 0 && (
                    <div className='bg-muted/50 flex items-center justify-between rounded-lg border p-3'>
                        <span className='text-sm font-medium'>{selectedComplaints.length} complaint(s) selected</span>
                        <Button className='gap-2' onClick={handleBulkDelete} size='sm' variant='destructive'>
                            <Trash2 className='h-4 w-4' />
                            Delete Selected
                        </Button>
                    </div>
                )}

                <DataTable
                    baseKey={TANSTACK_QUERY_KEYS.COMPLAINTS}
                    baseRoute={ROUTES.COMPLAINTS}
                    columns={memoizedColumns}
                    data={complaints?.data?.data || []}
                    filters={filters}
                    meta={complaints?.data?.meta as any}
                    setFilters={setFilters}
                    tableOptions={{
                        enableRowSelection: true,
                        state: {
                            rowSelection,
                        },
                        onRowSelectionChange: setRowSelection,
                        getRowId: (row) => row.id.toString(),
                    }}
                />
            </div>
        </AppLayout>
    );
}
