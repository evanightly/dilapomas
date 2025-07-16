import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { userServiceHook } from '@/services/userServiceHook';
import { UserResource } from '@/support/interfaces/resources';
import { type BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, Save, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const userSchema = z
    .object({
        nip: z.string().min(1, 'NIP is required'),
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Please enter a valid email'),
        phone_number: z.string().optional(),
        home_address: z.string().min(1, 'Home address is required'),
        role: z.enum(['SuperAdmin', 'Employee']),
        password: z.string().optional(),
        password_confirmation: z.string().optional(),
    })
    .refine(
        (data) => {
            if (data.password && data.password_confirmation) {
                return data.password === data.password_confirmation;
            }
            return true;
        },
        {
            message: 'Passwords do not match',
            path: ['password_confirmation'],
        },
    );

type UserFormData = z.infer<typeof userSchema>;

interface EditUserProps {
    data: UserResource;
    roles: string[];
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
    {
        title: 'Edit User',
        href: '/users/edit',
    },
];

export default function EditUser({ data: user, roles }: EditUserProps) {
    const updateUser = userServiceHook.useUpdate();

    const form = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            nip: user.nip,
            name: user.name,
            email: user.email,
            phone_number: user.phone_number || '',
            home_address: user.home_address,
            role: user.role,
            password: '',
            password_confirmation: '',
        },
    });

    const onSubmit = async (data: UserFormData) => {
        // Remove empty password fields
        if (!data.password) {
            delete data.password;
            delete data.password_confirmation;
        }

        updateUser.mutate(
            { id: user.nip as any, data },
            {
                onSuccess: () => {
                    toast.success('User updated successfully!');
                    router.visit(route('users.index'));
                },
                onError: (error: any) => {
                    if (error.response?.data?.errors) {
                        Object.entries(error.response.data.errors).forEach(([field, messages]: [string, any]) => {
                            form.setError(field as keyof UserFormData, {
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
            <Head title={`Edit User - ${user.name}`} />

            <div className='space-y-6'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                        <Button variant='ghost' onClick={() => router.visit(route('users.index'))} className='gap-2'>
                            <ArrowLeft className='h-4 w-4' />
                            Back to Users
                        </Button>
                        <div>
                            <h1 className='text-foreground text-2xl font-bold'>Edit User</h1>
                            <p className='text-muted-foreground'>Update user information</p>
                        </div>
                    </div>
                </div>

                <Card className='max-w-2xl'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                            <User className='h-5 w-5' />
                            User Information
                        </CardTitle>
                        <CardDescription>Update the details for {user.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                    <FormField
                                        control={form.control}
                                        name='nip'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>NIP (Employee ID)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Enter NIP' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name='name'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Enter full name' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email Address</FormLabel>
                                                <FormControl>
                                                    <Input type='email' placeholder='Enter email address' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name='phone_number'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone Number (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Enter phone number' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name='home_address'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Home Address</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder='Enter home address' rows={3} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='role'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Role</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder='Select a role' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {roles.map((role) => (
                                                        <SelectItem key={role} value={role}>
                                                            {role}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className='space-y-4 border-t pt-4'>
                                    <h3 className='text-lg font-medium'>Change Password (Optional)</h3>
                                    <p className='text-muted-foreground text-sm'>Leave blank to keep current password</p>

                                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                        <FormField
                                            control={form.control}
                                            name='password'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>New Password</FormLabel>
                                                    <FormControl>
                                                        <Input type='password' placeholder='Enter new password' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='password_confirmation'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Confirm New Password</FormLabel>
                                                    <FormControl>
                                                        <Input type='password' placeholder='Confirm new password' {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className='flex items-center space-x-4 pt-4'>
                                    <Button type='submit' disabled={updateUser.isPending} className='gap-2'>
                                        {updateUser.isPending ? (
                                            <>
                                                <div className='h-4 w-4 animate-spin rounded-full border-b-2 border-white'></div>
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <Save className='h-4 w-4' />
                                                Update User
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        type='button'
                                        variant='outline'
                                        onClick={() => router.visit(route('users.index'))}
                                        disabled={updateUser.isPending}
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
