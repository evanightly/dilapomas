import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Head, router } from '@inertiajs/react';
import { FileText, Home, LogOut, Menu, Radio, Settings, Users, X } from 'lucide-react';
import { PropsWithChildren, ReactNode, useState } from 'react';

interface DashboardLayoutProps extends PropsWithChildren {
    user?: {
        name: string;
        email: string;
        role: string;
        nip: string;
    };
    header?: ReactNode;
}

const navigation = [
    { name: 'Dashboard', href: 'dashboard', icon: Home },
    { name: 'Complaints', href: 'complaints.index', icon: FileText },
    { name: 'Users', href: 'users.index', icon: Users, adminOnly: true },
];

export default function DashboardLayout({ user, header, children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const isAdmin = user?.role === 'SuperAdmin';

    return (
        <>
            <Head title='Dashboard - RRI Complaint System' />

            <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
                {/* Mobile sidebar */}
                <div className={cn('fixed inset-0 z-50 lg:hidden', sidebarOpen ? 'block' : 'hidden')}>
                    <div className='bg-opacity-75 fixed inset-0 bg-gray-600' onClick={() => setSidebarOpen(false)} />
                    <div className='relative flex h-full w-64 flex-col bg-white shadow-xl dark:bg-gray-800'>
                        <div className='flex items-center justify-between border-b p-4'>
                            <div className='flex items-center space-x-3'>
                                <div className='bg-primary flex h-8 w-8 items-center justify-center rounded-lg'>
                                    <Radio className='text-primary-foreground h-5 w-5' />
                                </div>
                                <span className='text-lg font-semibold'>RRI Admin</span>
                            </div>
                            <Button onClick={() => setSidebarOpen(false)} size='icon' variant='ghost'>
                                <X className='h-5 w-5' />
                            </Button>
                        </div>
                        <nav className='flex-1 p-4'>
                            <ul className='space-y-2'>
                                {navigation.map((item) => {
                                    if (item.adminOnly && !isAdmin) return null;

                                    const Icon = item.icon;
                                    const isActive = route().current(item.href);

                                    return (
                                        <li key={item.name}>
                                            <a
                                                className={cn(
                                                    'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                                    isActive
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
                                                )}
                                                href={route(item.href)}
                                            >
                                                <Icon className='mr-3 h-5 w-5' />
                                                {item.name}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Desktop sidebar */}
                <div className='hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col'>
                    <div className='flex flex-1 flex-col border-r bg-white dark:bg-gray-800'>
                        <div className='flex items-center border-b p-4'>
                            <div className='flex items-center space-x-3'>
                                <div className='bg-primary flex h-8 w-8 items-center justify-center rounded-lg'>
                                    <Radio className='text-primary-foreground h-5 w-5' />
                                </div>
                                <span className='text-lg font-semibold'>RRI Admin</span>
                            </div>
                        </div>
                        <nav className='flex-1 p-4'>
                            <ul className='space-y-2'>
                                {navigation.map((item) => {
                                    if (item.adminOnly && !isAdmin) return null;

                                    const Icon = item.icon;
                                    const isActive = route().current(item.href);

                                    return (
                                        <li key={item.name}>
                                            <a
                                                className={cn(
                                                    'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                                    isActive
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
                                                )}
                                                href={route(item.href)}
                                            >
                                                <Icon className='mr-3 h-5 w-5' />
                                                {item.name}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Main content */}
                <div className='lg:pl-64'>
                    {/* Top navigation */}
                    <header className='border-b bg-white shadow-sm dark:bg-gray-800'>
                        <div className='flex items-center justify-between p-4'>
                            <div className='flex items-center'>
                                <Button className='lg:hidden' onClick={() => setSidebarOpen(true)} size='icon' variant='ghost'>
                                    <Menu className='h-5 w-5' />
                                </Button>
                                {header}
                            </div>

                            <div className='flex items-center space-x-4'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className='relative h-8 w-8 rounded-full' variant='ghost'>
                                            <Avatar className='h-8 w-8'>
                                                <AvatarImage alt={user?.name} src='' />
                                                <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align='end' className='w-56' forceMount>
                                        <DropdownMenuLabel className='font-normal'>
                                            <div className='flex flex-col space-y-1'>
                                                <p className='text-sm leading-none font-medium'>{user?.name}</p>
                                                <p className='text-muted-foreground text-xs leading-none'>{user?.email}</p>
                                                <p className='text-muted-foreground text-xs leading-none'>
                                                    {user?.role} • {user?.nip}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Settings className='mr-2 h-4 w-4' />
                                            <span>Settings</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleLogout}>
                                            <LogOut className='mr-2 h-4 w-4' />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </header>

                    {/* Page content */}
                    <main className='p-6'>{children}</main>
                </div>
            </div>
        </>
    );
}
