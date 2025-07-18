import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { ArrowRight, Radio, Shield } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const loginSchema = z.object({
    nip: z.string().min(1, 'NIP is required'),
    password: z.string().min(1, 'Password is required'),
    remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginProps {
    status?: string;
    canResetPassword?: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            nip: '',
            password: '',
            remember: false,
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);

        router.post(route('login'), data, {
            onSuccess: () => {
                toast.success('Login successful! Redirecting...');
            },
            onError: (errors) => {
                if (errors.nip) {
                    form.setError('nip', { message: errors.nip });
                }
                if (errors.password) {
                    form.setError('password', { message: errors.password });
                }
                if (errors.general) {
                    toast.error(errors.general);
                } else {
                    toast.error('Login failed. Please check your credentials.');
                }
            },
            onFinish: () => {
                setIsLoading(false);
            },
        });
    };

    return (
        <>
            <Head title='Login - RRI Complaint System' />

            <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900'>
                <div className='grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-2'>
                    {/* Left Side - Hero Content */}
                    <div className='hidden flex-col space-y-8 px-8 lg:flex'>
                        <div className='space-y-6'>
                            <div className='flex items-center space-x-3'>
                                <div className='bg-primary flex h-12 w-12 items-center justify-center rounded-xl'>
                                    <Radio className='text-primary-foreground h-7 w-7' />
                                </div>
                                <div>
                                    <h1 className='text-foreground text-2xl font-bold'>RRI Complaint System</h1>
                                    <p className='text-muted-foreground text-sm'>Radio Republik Indonesia</p>
                                </div>
                            </div>

                            <div className='space-y-4'>
                                <h2 className='from-primary bg-gradient-to-r to-blue-600 bg-clip-text text-4xl font-bold text-transparent lg:text-5xl'>
                                    Secure Access Portal
                                </h2>
                                <p className='text-muted-foreground text-lg leading-relaxed'>
                                    Access the RRI complaint management system with your authorized credentials. Manage complaints efficiently and
                                    ensure public service excellence.
                                </p>
                            </div>

                            <div className='grid grid-cols-1 gap-4'>
                                <div className='border-l-primary flex items-center space-x-3 border-l-4 pl-4'>
                                    <Shield className='text-primary h-5 w-5' />
                                    <span className='text-muted-foreground text-sm'>Secure authentication with industry-standard encryption</span>
                                </div>
                                <div className='border-l-primary flex items-center space-x-3 border-l-4 pl-4'>
                                    <ArrowRight className='text-primary h-5 w-5' />
                                    <span className='text-muted-foreground text-sm'>Role-based access control for different user types</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className='flex items-center justify-center'>
                        <Card className='w-full max-w-md border-0 bg-white/80 shadow-xl backdrop-blur-sm dark:bg-gray-800/80'>
                            <CardHeader className='space-y-4 text-center'>
                                <div className='mb-4 flex items-center justify-center space-x-3 lg:hidden'>
                                    <div className='bg-primary flex h-10 w-10 items-center justify-center rounded-lg'>
                                        <Radio className='text-primary-foreground h-6 w-6' />
                                    </div>
                                    <div>
                                        <h1 className='text-foreground text-xl font-bold'>RRI Complaint System</h1>
                                    </div>
                                </div>
                                <CardTitle className='text-foreground text-2xl font-bold'>Welcome Back</CardTitle>
                                <CardDescription className='text-muted-foreground'>Sign in to your account to continue</CardDescription>
                                {status && <div className='text-sm text-green-600 dark:text-green-400'>{status}</div>}
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                                        <FormField
                                            control={form.control}
                                            name='nip'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>NIP (Employee ID)</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} className='h-11' disabled={isLoading} placeholder='Enter your NIP' />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name='password'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className='h-11'
                                                            disabled={isLoading}
                                                            placeholder='Enter your password'
                                                            type='password'
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className='flex items-center justify-between'>
                                            <FormField
                                                control={form.control}
                                                name='remember'
                                                render={({ field }) => (
                                                    <FormItem className='flex items-center space-x-2'>
                                                        <FormControl>
                                                            <input
                                                                checked={field.value}
                                                                className='text-primary focus:ring-primary h-4 w-4 rounded border-gray-300'
                                                                disabled={isLoading}
                                                                onChange={field.onChange}
                                                                type='checkbox'
                                                            />
                                                        </FormControl>
                                                        <FormLabel className='text-sm font-normal'>Remember me</FormLabel>
                                                    </FormItem>
                                                )}
                                            />

                                            {canResetPassword && (
                                                <a
                                                    className='text-primary hover:text-primary/80 text-sm transition-colors'
                                                    href={route('password.request')}
                                                >
                                                    Forgot password?
                                                </a>
                                            )}
                                        </div>

                                        <Button className='bg-primary hover:bg-primary/90 h-11 w-full' disabled={isLoading} type='submit'>
                                            {isLoading ? (
                                                <div className='flex items-center space-x-2'>
                                                    <div className='h-4 w-4 animate-spin rounded-full border-b-2 border-white'></div>
                                                    <span>Signing in...</span>
                                                </div>
                                            ) : (
                                                'Sign In'
                                            )}
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
