import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Head, router } from '@inertiajs/react';
import { Clock, FileText, Filter, RotateCcw, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface DashboardProps {
    stats: {
        totalComplaints: number;
        totalUsers: number;
        pendingComplaints: number;
        resolvedComplaints: number;
        inProgressComplaints: number;
        rejectedComplaints: number;
    };
    statusStats: Record<string, number>;
    priorityStats: Record<string, number>;
    monthlyStats: Array<{
        month: string;
        complaints: number;
        resolved: number;
    }>;
    recentComplaints: Array<{
        id: number;
        incident_title: string;
        incident_description: string;
        reporter: string;
        reporter_type: string;
        status: string;
        priority: string;
        evidences_count: number;
        days_since_created: number;
        time_since_created: string;
        time_created: string;
        created_at: string;
    }>;
    filters: {
        date_from?: string;
        date_to?: string;
        status?: string;
        priority?: string;
        months_back?: number;
    };
    filterOptions: {
        statuses: string[];
        priorities: string[];
    };
}

export default function Dashboard({ stats, statusStats, priorityStats, monthlyStats, recentComplaints, filters, filterOptions }: DashboardProps) {
    const [localFilters, setLocalFilters] = useState({
        date_from: filters.date_from || '',
        date_to: filters.date_to || '',
        status: filters.status || '',
        priority: filters.priority || '',
        months_back: filters.months_back || 6,
    });
    const statCards = [
        {
            title: 'Total Keluhan',
            value: stats.totalComplaints,
            // description: 'All submitted complaints',
            icon: FileText,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100 dark:bg-blue-900',
        },
        {
            title: 'Total Pengguna',
            value: stats.totalUsers,
            // description: 'Active system users',
            icon: Users,
            color: 'text-green-600',
            bgColor: 'bg-green-100 dark:bg-green-900',
        },
        {
            title: 'Menunggu Tanggapan',
            value: stats.pendingComplaints,
            // description: 'Awaiting resolution',
            icon: Clock,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100 dark:bg-yellow-900',
        },
        {
            title: 'Keluhan Teratasi',
            value: stats.resolvedComplaints,
            // description: 'Successfully resolved',
            icon: TrendingUp,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-100 dark:bg-emerald-900',
        },
    ];

    // Prepare data for charts
    const statusChartData = Object.entries(statusStats).map(([status, count]) => ({
        name: status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        value: count,
        color:
            {
                pending: '#EAB308',
                in_progress: '#3B82F6',
                resolved: '#10B981',
                rejected: '#EF4444',
            }[status] || '#6B7280',
    }));

    const priorityChartData = Object.entries(priorityStats).map(([priority, count]) => ({
        name: priority.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        value: count,
        color:
            {
                low: '#10B981',
                medium: '#F59E0B',
                high: '#EF4444',
            }[priority] || '#6B7280',
    }));

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'in_progress':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'resolved':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'rejected':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'low':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'high':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    return (
        <>
            <Head title='Dashboard' />

            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
                        <div className='flex items-center gap-2 px-4'>
                            <SidebarTrigger className='-ml-1' />
                            <Separator className='mr-2 h-4' orientation='vertical' />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                    <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
                        <div className='space-y-6'>
                            <div>
                                <h1 className='text-foreground text-2xl font-bold'>Dashboard</h1>
                                <p className='text-muted-foreground'>Selamat Datang di layanan pengaduan RRI Pontianak</p>
                            </div>

                            {/* Filters */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className='flex items-center gap-2'>
                                        <Filter className='h-5 w-5' />
                                        Dashboard Filters
                                    </CardTitle>
                                    <CardDescription>Filter the dashboard data by date range, status, and priority</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className='grid grid-cols-1 gap-4 md:grid-cols-6'>
                                        <div className='space-y-2'>
                                            <Label htmlFor='date_from'>From Date</Label>
                                            <Input
                                                id='date_from'
                                                onChange={(e) => setLocalFilters((prev) => ({ ...prev, date_from: e.target.value }))}
                                                type='date'
                                                value={localFilters.date_from}
                                            />
                                        </div>
                                        <div className='space-y-2'>
                                            <Label htmlFor='date_to'>To Date</Label>
                                            <Input
                                                id='date_to'
                                                onChange={(e) => setLocalFilters((prev) => ({ ...prev, date_to: e.target.value }))}
                                                type='date'
                                                value={localFilters.date_to}
                                            />
                                        </div>
                                        <div className='space-y-2'>
                                            <Label>Status</Label>
                                            <Select
                                                onValueChange={(value) =>
                                                    setLocalFilters((prev) => ({ ...prev, status: value === 'all' ? '' : value }))
                                                }
                                                value={localFilters.status}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder='All Statuses' />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='all'>All Statuses</SelectItem>
                                                    {filterOptions.statuses.map((status) => (
                                                        <SelectItem key={status} value={status}>
                                                            {status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className='space-y-2'>
                                            <Label>Priority</Label>
                                            <Select
                                                onValueChange={(value) =>
                                                    setLocalFilters((prev) => ({ ...prev, priority: value === 'all' ? '' : value }))
                                                }
                                                value={localFilters.priority}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder='All Priorities' />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='all'>All Priorities</SelectItem>
                                                    {filterOptions.priorities.map((priority) => (
                                                        <SelectItem key={priority} value={priority}>
                                                            {priority.replace(/\b\w/g, (l) => l.toUpperCase())}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className='space-y-2'>
                                            <Label>Months Back</Label>
                                            <Select
                                                onValueChange={(value) => setLocalFilters((prev) => ({ ...prev, months_back: parseInt(value) }))}
                                                value={localFilters.months_back.toString()}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='3'>3 Months</SelectItem>
                                                    <SelectItem value='6'>6 Months</SelectItem>
                                                    <SelectItem value='12'>12 Months</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className='flex items-end gap-2'>
                                            <Button
                                                className='flex-1'
                                                onClick={() => {
                                                    router.visit(route('dashboard'), {
                                                        data: localFilters,
                                                        preserveState: true,
                                                    });
                                                }}
                                            >
                                                Apply Filters
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setLocalFilters({
                                                        date_from: '',
                                                        date_to: '',
                                                        status: '',
                                                        priority: '',
                                                        months_back: 6,
                                                    });
                                                    router.visit(route('dashboard'));
                                                }}
                                                variant='outline'
                                            >
                                                <RotateCcw className='h-4 w-4' />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Stats Cards */}
                            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
                                {statCards.map((stat, index) => {
                                    const Icon = stat.icon;
                                    return (
                                        <Card className='relative overflow-hidden' key={index}>
                                            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                                <CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
                                                <div className={`rounded-md p-2 ${stat.bgColor}`}>
                                                    <Icon className={`h-4 w-4 ${stat.color}`} />
                                                </div>
                                            </CardHeader>
                                            {/* <CardContent>
                                                <div className='text-2xl font-bold'>{stat.value.toLocaleString()}</div>
                                                <p className='text-muted-foreground text-xs'>{stat.description}</p>
                                            </CardContent> */}
                                        </Card>
                                    );
                                })}
                            </div>

                            {/* Charts Section */}
                            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                                {/* Status Distribution Chart */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Complaint Status Distribution</CardTitle>
                                        <CardDescription>Overview of complaint statuses</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer height={300} width='100%'>
                                            <PieChart>
                                                <Pie
                                                    cx='50%'
                                                    cy='50%'
                                                    data={statusChartData}
                                                    dataKey='value'
                                                    innerRadius={60}
                                                    outerRadius={100}
                                                    paddingAngle={5}
                                                >
                                                    {statusChartData.map((entry, index) => (
                                                        <Cell fill={entry.color} key={`cell-${index}`} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className='mt-4 grid grid-cols-2 gap-2'>
                                            {statusChartData.map((entry, index) => (
                                                <div className='flex items-center gap-2' key={index}>
                                                    <div className='h-3 w-3 rounded-full' style={{ backgroundColor: entry.color }} />
                                                    <span className='text-sm'>
                                                        {entry.name}: {entry.value}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Priority Distribution Chart */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Priority Distribution</CardTitle>
                                        <CardDescription>Breakdown by complaint priority</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer height={300} width='100%'>
                                            <BarChart data={priorityChartData}>
                                                <CartesianGrid strokeDasharray='3 3' />
                                                <XAxis dataKey='name' />
                                                <YAxis />
                                                <Tooltip />
                                                <Bar dataKey='value'>
                                                    {priorityChartData.map((entry, index) => (
                                                        <Cell fill={entry.color} key={`cell-${index}`} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Monthly Trends Chart */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Monthly Trends</CardTitle>
                                    <CardDescription>Complaint submission and resolution trends over the last 6 months</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer height={300} width='100%'>
                                        <LineChart data={monthlyStats}>
                                            <CartesianGrid strokeDasharray='3 3' />
                                            <XAxis dataKey='month' />
                                            <YAxis />
                                            <Tooltip />
                                            <Line dataKey='complaints' name='Complaints' stroke='#3B82F6' strokeWidth={2} type='monotone' />
                                            <Line dataKey='resolved' name='Resolved' stroke='#10B981' strokeWidth={2} type='monotone' />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card> */

                            {/* Recent Complaints */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Complaints</CardTitle>
                                    <CardDescription>Latest submitted complaints</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {recentComplaints.length > 0 ? (
                                        <div className='space-y-4'>
                                            {recentComplaints.map((complaint) => (
                                                <div className='rounded-lg border p-4 transition-colors' key={complaint.id}>
                                                    <div className='flex items-start justify-between'>
                                                        <div className='flex-1 space-y-2'>
                                                            <div className='flex items-center gap-2'>
                                                                <h4 className='text-foreground font-medium'>
                                                                    {complaint.incident_title || `Complaint #${complaint.id}`}
                                                                </h4>
                                                                <span className='text-foreground/80 text-xs'>#{complaint.id}</span>
                                                            </div>
                                                            <p className='text-sm leading-relaxed text-gray-600'>{complaint.incident_description}</p>
                                                            <div className='text-foreground/80 flex items-center gap-4 text-xs'>
                                                                <span>
                                                                    Reporter: {complaint.reporter} ({complaint.reporter_type})
                                                                </span>
                                                                <span>•</span>
                                                                <span>{complaint.evidences_count} evidence(s)</span>
                                                                <span>•</span>
                                                                <span>{complaint.days_since_created} days ago</span>
                                                                <span>•</span>
                                                                <span>
                                                                    {complaint.time_created} ({complaint.time_since_created})
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-col items-end gap-2'>
                                                            <div className='flex items-center gap-2'>
                                                                <span
                                                                    className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(complaint.status)}`}
                                                                >
                                                                    {complaint.status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                                                                </span>
                                                                <span
                                                                    className={`rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(complaint.priority)}`}
                                                                >
                                                                    {complaint.priority.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                                                                </span>
                                                            </div>
                                                            <p className='text-foreground/80 text-xs'>{formatDate(complaint.created_at)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className='text-muted-foreground py-6 text-center'>
                                            <FileText className='mx-auto mb-2 h-8 w-8 opacity-50' />
                                            <p>No recent complaints</p>
                                            <p className='text-xs'>Recent complaints will appear here</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card> */
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
