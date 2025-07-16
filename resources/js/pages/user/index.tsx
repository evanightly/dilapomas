import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/data-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { useConfirmation } from '@/contexts/confirmation-dialog-context';
import AppLayout from '@/layouts/app-layout';
import { userServiceHook } from '@/services/userServiceHook';
import { ROUTES } from '@/support/constants/routes';
import { TANSTACK_QUERY_KEYS } from '@/support/constants/tanstackQueryKeys';
import { ServiceFilterOptions } from '@/support/interfaces/others';
import { UserResource } from '@/support/interfaces/resources';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Edit, Plus, Trash2, UserMinus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

interface Props {
    data: {
        data: UserResource[];
        meta: any;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Users',
        href: '/users',
    },
];

export default function UserIndex({ data }: Props) {
    const confirmAction = useConfirmation();
    const [selectedUsers, setSelectedUsers] = useState<UserResource[]>([]);
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const columnHelper = createColumnHelper<UserResource>();
    const [filters, setFilters] = useState<ServiceFilterOptions>({
        page: 1,
        page_size: 10,
        sort_by: 'created_at',
    });
    const users = userServiceHook.useGetAll({ filters });
    const handleBulkDelete = () => {
        if (selectedUsers.length === 0) return;

        const userIds = selectedUsers.map((user) => user.nip);

        confirmAction(() => {
            userIds.forEach((nip) => {
                router.delete(route('users.destroy', nip), {
                    onSuccess: () => {
                        toast.success('Users deleted successfully');
                    },
                    onError: () => {
                        toast.error('Failed to delete some users');
                    },
                    preserveState: true,
                });
            });
            setSelectedUsers([]);
            setRowSelection({});
        });
    };

    // Sync TanStack row selection with component state
    useEffect(() => {
        if (!data?.data) return;

        const selectedRows = Object.keys(rowSelection)
            .filter((key) => rowSelection[key])
            .map((id) => data.data.find((user) => user.nip.toString() === id))
            .filter(Boolean) as UserResource[];

        setSelectedUsers(selectedRows);
    }, [rowSelection, data?.data]);

    const handleSingleDelete = (nip: string) => {
        confirmAction(() => {
            router.delete(route('users.destroy', nip), {
                onSuccess: () => {
                    toast.success('User deleted successfully');
                },
                onError: () => {
                    toast.error('Failed to delete user');
                },
                preserveState: true,
            });
        });
    };

    const handleEdit = (nip: string) => {
        router.visit(route('users.edit', nip));
    };

    // DataTable columns for bulk operations
    const columns = [
        // Checkbox column for row selection
        columnHelper.display({
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                    aria-label='Select all'
                />
            ),
            cell: ({ row }) => (
                <Checkbox onCheckedChange={(value) => row.toggleSelected(!!value)} checked={row.getIsSelected()} aria-label='Select row' />
            ),
            enableSorting: false,
            enableHiding: false,
            size: 40,
        }),
        columnHelper.display({
            id: 'avatar',
            header: '',
            cell: ({ row }) => (
                <Avatar className='h-8 w-8'>
                    <AvatarFallback className='text-xs'>{row.original.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
            ),
            enableSorting: false,
            size: 50,
        }),
        columnHelper.accessor('nip', {
            header: ({ column }) => <DataTableColumnHeader title='NIP' column={column} />,
            cell: ({ row }) => <div className='font-mono text-sm'>{row.original.nip}</div>,
        }),
        columnHelper.accessor('name', {
            header: ({ column }) => <DataTableColumnHeader title='Name' column={column} />,
            cell: ({ row }) => <div className='font-medium'>{row.original.name}</div>,
        }),
        columnHelper.accessor('email', {
            header: ({ column }) => <DataTableColumnHeader title='Email' column={column} />,
            cell: ({ row }) => <div className='text-muted-foreground'>{row.original.email}</div>,
        }),
        columnHelper.accessor('role', {
            header: ({ column }) => <DataTableColumnHeader title='Role' column={column} />,
            cell: ({ row }) => (
                <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        row.original.role === 'SuperAdmin'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                    }`}
                >
                    {row.original.role}
                </div>
            ),
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className='flex items-center space-x-2'>
                    <Button variant='ghost' size='icon' onClick={() => handleEdit(row.original.nip)} className='h-8 w-8'>
                        <Edit className='h-4 w-4' />
                    </Button>
                    {row.original.role !== 'SuperAdmin' && (
                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => handleSingleDelete(row.original.nip)}
                            className='text-destructive hover:text-destructive h-8 w-8'
                        >
                            <Trash2 className='h-4 w-4' />
                        </Button>
                    )}
                </div>
            ),
            enableSorting: false,
            size: 100,
        }),
    ] as Array<ColumnDef<UserResource, UserResource>>;

    const memoizedColumns = useMemo(() => columns, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='User Management' />

            <div className='space-y-6'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='text-foreground text-2xl font-bold'>User Management</h1>
                        <p className='text-muted-foreground'>Manage system users and their roles</p>
                    </div>
                    <Button onClick={() => router.visit(route('users.create'))} className='gap-2'>
                        <Plus className='h-4 w-4' />
                        Add User
                    </Button>
                </div>

                {selectedUsers.length > 0 && (
                    <div className='bg-muted/50 flex items-center justify-between rounded-lg border p-3'>
                        <span className='text-sm font-medium'>{selectedUsers.length} user(s) selected</span>
                        <Button variant='destructive' size='sm' onClick={handleBulkDelete} className='gap-2'>
                            <UserMinus className='h-4 w-4' />
                            Delete Selected
                        </Button>
                    </div>
                )}

                <DataTable
                    tableOptions={{
                        enableRowSelection: true,
                        state: {
                            rowSelection,
                        },
                        onRowSelectionChange: setRowSelection,
                        getRowId: (row) => row.nip.toString(),
                    }}
                    filters={filters}
                    setFilters={setFilters}
                    baseKey={TANSTACK_QUERY_KEYS.USERS}
                    baseRoute={ROUTES.USERS}
                    meta={users.data?.meta || {}}
                    data={users?.data?.data || []}
                    columns={memoizedColumns}
                />
            </div>
        </AppLayout>
    );
}
