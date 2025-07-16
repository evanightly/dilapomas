import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Head } from '@inertiajs/react';
import { Clock, FileText, TrendingUp, Users } from 'lucide-react';

interface DashboardProps {
    stats?: {
        totalComplaints: number;
        totalUsers: number;
        pendingComplaints: number;
        resolvedComplaints: number;
    };
}

export default function Dashboard({ stats }: DashboardProps) {
    const defaultStats = {
        totalComplaints: 0,
        totalUsers: 0,
        pendingComplaints: 0,
        resolvedComplaints: 0,
        ...stats,
    };

    const statCards = [
        {
            title: 'Total Complaints',
            value: defaultStats.totalComplaints,
            description: 'All submitted complaints',
            icon: FileText,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100 dark:bg-blue-900',
        },
        {
            title: 'Total Users',
            value: defaultStats.totalUsers,
            description: 'Active system users',
            icon: Users,
            color: 'text-green-600',
            bgColor: 'bg-green-100 dark:bg-green-900',
        },
        {
            title: 'Pending Complaints',
            value: defaultStats.pendingComplaints,
            description: 'Awaiting resolution',
            icon: Clock,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-100 dark:bg-yellow-900',
        },
        {
            title: 'Resolved Complaints',
            value: defaultStats.resolvedComplaints,
            description: 'Successfully resolved',
            icon: TrendingUp,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-100 dark:bg-emerald-900',
        },
    ];

    return (
        <>
            <Head title='Dashboard' />

            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
                        <div className='flex items-center gap-2 px-4'>
                            <SidebarTrigger className='-ml-1' />
                            <Separator orientation='vertical' className='mr-2 h-4' />
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
                                <p className='text-muted-foreground'>Welcome to the RRI Complaint Management System</p>
                            </div>

                            {/* Stats Cards */}
                            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
                                {statCards.map((stat, index) => {
                                    const Icon = stat.icon;
                                    return (
                                        <Card key={index} className='relative overflow-hidden'>
                                            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                                <CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
                                                <div className={`rounded-md p-2 ${stat.bgColor}`}>
                                                    <Icon className={`h-4 w-4 ${stat.color}`} />
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className='text-2xl font-bold'>{stat.value.toLocaleString()}</div>
                                                <p className='text-muted-foreground text-xs'>{stat.description}</p>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>

                            {/* Welcome Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Welcome to RRI Complaint System</CardTitle>
                                    <CardDescription>Manage complaints efficiently and ensure excellent public service</CardDescription>
                                </CardHeader>
                                <CardContent className='space-y-4'>
                                    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                                        <div className='space-y-2'>
                                            <h3 className='font-semibold'>Quick Actions</h3>
                                            <ul className='text-muted-foreground space-y-1 text-sm'>
                                                <li>• View and manage submitted complaints</li>
                                                <li>• Add new users to the system</li>
                                                <li>• Track complaint resolution progress</li>
                                                <li>• Generate reports and analytics</li>
                                            </ul>
                                        </div>
                                        <div className='space-y-2'>
                                            <h3 className='font-semibold'>System Features</h3>
                                            <ul className='text-muted-foreground space-y-1 text-sm'>
                                                <li>• Role-based access control</li>
                                                <li>• Real-time complaint tracking</li>
                                                <li>• Secure data management</li>
                                                <li>• Comprehensive audit trail</li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Recent Activity Placeholder */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Activity</CardTitle>
                                    <CardDescription>Latest system activities and updates</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className='text-muted-foreground py-6 text-center'>
                                        <Clock className='mx-auto mb-2 h-8 w-8 opacity-50' />
                                        <p>No recent activity to display</p>
                                        <p className='text-xs'>Activity will appear here as users interact with the system</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
