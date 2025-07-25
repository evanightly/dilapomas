import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
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
    const page = usePage();

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
            <Head title='Login' />

            <motion.div
                animate={{ opacity: 1 }}
                className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900'
                initial={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className='flex w-full max-w-6xl flex-col items-center gap-8 lg:flex-row'
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Left Side - Hero Content */}
                    <motion.div
                        animate={{ opacity: 1, x: 0 }}
                        className='hidden flex-1 flex-col space-y-8 px-8 lg:flex'
                        initial={{ opacity: 0, x: -60 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <motion.div
                            animate={{ opacity: 1 }}
                            className='space-y-6'
                            initial={{ opacity: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <motion.div
                                animate={{ opacity: 1, y: 0 }}
                                className='flex items-center space-x-3'
                                initial={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                            >
                                <motion.div
                                    animate={{ scale: 1, rotate: 0 }}
                                    className='bg-primary flex h-12 w-12 items-center justify-center rounded-xl'
                                    initial={{ scale: 0, rotate: -180 }}
                                    transition={{ duration: 0.6, delay: 0.8, type: 'spring', stiffness: 200 }}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                    <img alt='logo' src='/blue-logo.jpg' />
                                </motion.div>
                                <div>
                                    <h1 className='text-foreground text-2xl font-bold'>{page.props?.name}</h1>
                                    <p className='text-muted-foreground text-sm'>Radio Republik Indonesia</p>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ opacity: 1, y: 0 }}
                                className='space-y-4'
                                initial={{ opacity: 0, y: 30 }}
                                transition={{ duration: 0.6, delay: 0.9 }}
                            >
                                <h2 className='from-primary bg-gradient-to-r to-blue-600 bg-clip-text text-4xl font-bold text-transparent lg:text-5xl'>
                                    RRI PONTIANAK
                                </h2>
                                <p className='text-muted-foreground text-lg leading-relaxed'>Layanan dan Pengelolaan Pengaduan Masyarakat</p>
                            </motion.div>

                            <motion.div
                                animate={{ opacity: 1, y: 0 }}
                                className='grid grid-cols-1 gap-4'
                                initial={{ opacity: 0, y: 30 }}
                                transition={{ duration: 0.6, delay: 1.0 }}
                            >
                                {/* <motion.div
                                    animate={{ opacity: 1, x: 0 }}
                                    className='border-l-primary flex items-center space-x-3 border-l-4 pl-4'
                                    initial={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5, delay: 1.1 }}
                                    whileHover={{ x: 5 }}
                                >
                                    <Shield className='text-primary h-5 w-5' />
                                    <span className='text-muted-foreground text-sm'>Secure authentication with industry-standard encryption</span>
                                </motion.div>
                                <motion.div
                                    animate={{ opacity: 1, x: 0 }}
                                    className='border-l-primary flex items-center space-x-3 border-l-4 pl-4'
                                    initial={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5, delay: 1.2 }}
                                    whileHover={{ x: 5 }}
                                >
                                    <ArrowRight className='text-primary h-5 w-5' />
                                    <span className='text-muted-foreground text-sm'>Role-based access control for different user types</span>
                                </motion.div> */}
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Login Form */}
                    <motion.div
                        animate={{ opacity: 1, x: 0 }}
                        className='flex flex-1'
                        initial={{ opacity: 0, x: 60 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <motion.div
                            animate={{ opacity: 1, scale: 1 }}
                            className='flex w-full max-w-md flex-col items-center justify-center'
                            initial={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            whileHover={{ y: -2 }}
                        >
                            <Card className='w-full max-w-md border-0 bg-white/80 shadow-xl backdrop-blur-sm dark:bg-gray-800/80'>
                                <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ duration: 0.6, delay: 0.8 }}>
                                    <CardHeader className='space-y-4 text-center'>
                                        <motion.div
                                            animate={{ opacity: 1, scale: 1 }}
                                            className='mb-4 flex items-center justify-center space-x-3 lg:hidden'
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.5, delay: 0.9 }}
                                        >
                                            <motion.div
                                                className='bg-primary flex h-10 w-10 items-center justify-center rounded-lg'
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <img alt='logo' src='/blue-logo.jpg' />
                                            </motion.div>
                                            <div>
                                                <h1 className='text-foreground text-xl font-bold'>{page.props?.name}</h1>
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            animate={{ opacity: 1, y: 0 }}
                                            initial={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.5, delay: 1.0 }}
                                        >
                                            <CardTitle className='text-foreground text-2xl font-bold'>Welcome Back</CardTitle>
                                        </motion.div>
                                        <motion.div
                                            animate={{ opacity: 1, y: 0 }}
                                            initial={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.5, delay: 1.1 }}
                                        >
                                            <CardDescription className='text-muted-foreground'>Sign in to your account to continue</CardDescription>
                                        </motion.div>
                                        {status && (
                                            <motion.div
                                                animate={{ opacity: 1, scale: 1 }}
                                                className='text-sm text-green-600 dark:text-green-400'
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.5, delay: 1.2 }}
                                            >
                                                {status}
                                            </motion.div>
                                        )}
                                    </CardHeader>
                                </motion.div>
                                <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ duration: 0.6, delay: 1.0 }}>
                                    <CardContent>
                                        <Form {...form}>
                                            <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                                                <motion.div
                                                    animate={{ opacity: 1, x: 0 }}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.5, delay: 1.2 }}
                                                >
                                                    <FormField
                                                        control={form.control}
                                                        name='nip'
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>NIP (Employee ID)</FormLabel>
                                                                <FormControl>
                                                                    <motion.div
                                                                        transition={{ type: 'spring', stiffness: 300 }}
                                                                        whileFocus={{ scale: 1.02 }}
                                                                    >
                                                                        <Input
                                                                            {...field}
                                                                            className='h-11'
                                                                            disabled={isLoading}
                                                                            placeholder='Enter your NIP'
                                                                        />
                                                                    </motion.div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </motion.div>

                                                <motion.div
                                                    animate={{ opacity: 1, x: 0 }}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.5, delay: 1.3 }}
                                                >
                                                    <FormField
                                                        control={form.control}
                                                        name='password'
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Password</FormLabel>
                                                                <FormControl>
                                                                    <motion.div
                                                                        transition={{ type: 'spring', stiffness: 300 }}
                                                                        whileFocus={{ scale: 1.02 }}
                                                                    >
                                                                        <Input
                                                                            {...field}
                                                                            className='h-11'
                                                                            disabled={isLoading}
                                                                            placeholder='Enter your password'
                                                                            type='password'
                                                                        />
                                                                    </motion.div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </motion.div>

                                                <motion.div
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className='flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between'
                                                    initial={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.5, delay: 1.4 }}
                                                >
                                                    <FormField
                                                        control={form.control}
                                                        name='remember'
                                                        render={({ field }) => (
                                                            <FormItem className='flex items-center space-x-2'>
                                                                <FormControl>
                                                                    <motion.input
                                                                        checked={field.value}
                                                                        className='text-primary focus:ring-primary h-4 w-4 rounded border-gray-300'
                                                                        disabled={isLoading}
                                                                        onChange={field.onChange}
                                                                        type='checkbox'
                                                                        whileTap={{ scale: 0.9 }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className='text-sm font-normal'>Remember me</FormLabel>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    {canResetPassword && (
                                                        <motion.a
                                                            className='text-primary hover:text-primary/80 text-sm transition-colors'
                                                            href={route('password.request')}
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            Forgot password?
                                                        </motion.a>
                                                    )}
                                                </motion.div>

                                                <motion.div
                                                    animate={{ opacity: 1, y: 0 }}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    transition={{ duration: 0.5, delay: 1.5 }}
                                                >
                                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                        <Button
                                                            className='bg-primary hover:bg-primary/90 h-11 w-full'
                                                            disabled={isLoading}
                                                            type='submit'
                                                        >
                                                            {isLoading ? (
                                                                <div className='flex items-center space-x-2'>
                                                                    <motion.div
                                                                        animate={{ rotate: 360 }}
                                                                        className='h-4 w-4 rounded-full border-b-2 border-white'
                                                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                                    />
                                                                    <span>Signing in...</span>
                                                                </div>
                                                            ) : (
                                                                'Sign In'
                                                            )}
                                                        </Button>
                                                    </motion.div>
                                                </motion.div>
                                            </form>
                                        </Form>
                                    </CardContent>
                                </motion.div>
                            </Card>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </>
    );
}
