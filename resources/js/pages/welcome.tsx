import { ComplaintForm } from '@/components/forms/ComplaintForm';
import { ModeToggle } from '@/components/mode-toggle';
import { useTheme } from '@/components/theme-provider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MagicCard } from '@/components/ui/magic-card';
import { Meteors } from '@/components/ui/meteors';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Award,
    CheckCircle,
    Clock,
    Eye,
    File,
    FileImage,
    FileText,
    FileVideo,
    Heart,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Radio,
    Scale,
    Shield,
    Star,
    Upload,
    Zap,
} from 'lucide-react';

export default function Welcome() {
    const page = usePage();
    const theme = useTheme();

    const features = [
        {
            icon: Shield,
            title: 'Secure & Trusted',
            description: 'Your complaint data is protected with enterprise-grade security and end-to-end encryption.',
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: Clock,
            title: 'Quick Response',
            description: 'Our team is committed to responding to every complaint within a maximum of 24 hours.',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: Eye,
            title: 'Transparent Process',
            description: 'Monitor your complaint progress in real-time with our integrated tracking system.',
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: Scale,
            title: 'Legal Compliance',
            description: 'Every complaint is handled in accordance with Director General Regulation No. 06 of 2023.',
            color: 'from-orange-500 to-red-500',
        },
    ];

    const supportedFiles = [
        {
            icon: FileImage,
            title: 'Images',
            description: 'JPG, PNG, GIF, WebP, SVG',
            color: 'text-blue-500',
        },
        {
            icon: FileVideo,
            title: 'Videos',
            description: 'MP4, AVI, MOV, WebM',
            color: 'text-purple-500',
        },
        {
            icon: File,
            title: 'Documents',
            description: 'PDF, DOC, DOCX, TXT, RTF',
            color: 'text-green-500',
        },
        {
            icon: Upload,
            title: 'Large Files',
            description: 'Up to 100MB per file',
            color: 'text-orange-500',
        },
    ];

    const stats = [
        {
            icon: Award,
            number: '1000+',
            label: 'Complaints Resolved',
            color: 'from-yellow-400 to-orange-500',
        },
        {
            icon: Star,
            number: '4.9/5',
            label: 'Customer Satisfaction',
            color: 'from-green-400 to-emerald-500',
        },
        {
            icon: Clock,
            number: '24/7',
            label: 'Support Available',
            color: 'from-blue-400 to-cyan-500',
        },
        {
            icon: CheckCircle,
            number: '99.9%',
            label: 'Uptime Guarantee',
            color: 'from-purple-400 to-pink-500',
        },
    ];

    return (
        <>
            <Head title='RRI Complaint System - Submit Your Complaint' />

            <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'>
                {/* Header */}
                <header className='border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
                    <div className='container mx-auto flex h-16 items-center justify-between px-4'>
                        <div className='flex items-center space-x-3'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600'>
                                <img alt='logo' src='/blue-logo.jpg' />
                            </div>
                            <div>
                                <h1 className='text-foreground text-xl font-bold'>{page.props?.name}</h1>
                                <p className='text-muted-foreground text-xs'>Radio Republik Indonesia</p>
                            </div>
                        </div>
                        <div className='flex items-center space-x-4'>
                            <nav className='hidden space-x-6 md:flex'>
                                <a className='text-muted-foreground hover:text-foreground transition-colors' href='#home'>
                                    Home
                                </a>
                                <a className='text-muted-foreground hover:text-foreground transition-colors' href='#features'>
                                    Features
                                </a>
                                <a className='text-muted-foreground hover:text-foreground transition-colors' href='#contact'>
                                    Contact
                                </a>
                                <a
                                    className='text-muted-foreground hover:text-foreground transition-colors'
                                    href='https://ppid.rri.go.id'
                                    target='_blank'
                                >
                                    Halaman Pusat
                                </a>
                            </nav>
                            <div className='flex items-center space-x-3'>
                                <Link href='/login'>
                                    <Button className='font-medium' variant='ghost'>
                                        Login
                                    </Button>
                                </Link>
                                <Link href='/register'>
                                    <Button className='from-primary to-primary/75 text-primary-foreground bg-gradient-to-r'>Register</Button>
                                </Link>
                                <ModeToggle />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section with Form */}
                <section className='relative pt-8 pb-20' id='home'>
                    <Meteors number={30} />
                    <div className='container mx-auto px-4'>
                        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20'>
                            {/* Left Side - Hero Content */}
                            <div className='mt-8 flex flex-col space-y-8 lg:py-16'>
                                <div className='space-y-6'>
                                    <Badge className='w-fit px-4 py-2 text-sm' variant='secondary'>
                                        <Radio className='mr-2 h-4 w-4' />
                                        Official RRI Complaint System
                                    </Badge>

                                    <h1 className='text-4xl leading-tight font-bold tracking-tight md:text-5xl lg:text-6xl'>
                                        <span className='from-primary to-primary/55 bg-gradient-to-r bg-clip-text text-transparent'>Your Voice,</span>
                                        <br />
                                        <span className='bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-300'>
                                            Our Responsibility
                                        </span>
                                    </h1>

                                    <p className='text-muted-foreground text-lg leading-relaxed md:text-xl'>
                                        Official Radio Republik Indonesia platform for receiving, managing, and following up on public complaints. We
                                        are committed to providing the best service with high transparency and accountability.
                                    </p>
                                </div>

                                {/* Stats Section */}
                                <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                                    {stats.map((stat, index) => (
                                        <div className='text-center' key={index}>
                                            <div
                                                className={`mx-auto mb-2 h-12 w-12 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                                            >
                                                <stat.icon className='h-6 w-6 text-white' />
                                            </div>
                                            <div className='text-foreground text-2xl font-bold'>{stat.number}</div>
                                            <p className='text-muted-foreground text-xs'>{stat.label}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className='flex flex-col gap-4 sm:flex-row'>
                                    <Button
                                        className='from-primary to-primary/75 text-primary-foreground bg-gradient-to-r px-8 py-4 text-lg font-medium'
                                        size='lg'
                                    >
                                        <FileText className='mr-2 h-5 w-5' />
                                        Submit Complaint
                                        <ArrowRight className='ml-2 h-5 w-5' />
                                    </Button>

                                    <Button className='border-1 bg-white px-8 py-4 text-lg font-medium text-black hover:bg-white' size='lg'>
                                        <MessageCircle className='mr-2 h-5 w-5' />
                                        Learn More
                                    </Button>
                                </div>
                            </div>

                            {/* Right Side - Complaint Form */}
                            <div className='relative lg:py-8'>
                                <ComplaintForm />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className='bg-muted/30 relative py-20' id='features'>
                    <div className='container mx-auto px-4'>
                        <div className='mb-16 text-center'>
                            <h2 className='text-foreground mb-4 text-3xl font-bold md:text-4xl'>Why Choose Our System?</h2>
                            <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
                                Our commitment to providing the best complaint service with high professional standards
                            </p>
                        </div>

                        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
                            {features.map((feature, index) => (
                                <MagicCard className='group h-full' gradientColor={theme.theme === 'dark' ? '#262626' : '#D9D9D955'} key={index}>
                                    <Card className='h-full border-0 bg-transparent shadow-none'>
                                        <CardHeader className='pb-4 text-center'>
                                            <div
                                                className={`mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.color} flex transform items-center justify-center transition-all duration-300 group-hover:scale-110`}
                                            >
                                                <feature.icon className='h-8 w-8 text-white' />
                                            </div>
                                            <CardTitle className='text-foreground text-xl font-semibold'>{feature.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className='text-center'>
                                            <p className='text-muted-foreground'>{feature.description}</p>
                                        </CardContent>
                                    </Card>
                                </MagicCard>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Supported Files Section */}
                <section className='relative py-20'>
                    <div className='container mx-auto px-4'>
                        <div className='mb-16 text-center'>
                            <h2 className='text-foreground mb-4 text-3xl font-bold md:text-4xl'>Comprehensive Evidence Support</h2>
                            <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
                                Upload various file types as evidence for your complaints
                            </p>
                        </div>

                        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
                            {supportedFiles.map((file, index) => (
                                <MagicCard className='group h-full' gradientColor={theme.theme === 'dark' ? '#262626' : '#D9D9D955'} key={index}>
                                    <Card className='h-full border-0 bg-transparent shadow-none'>
                                        <CardHeader className='pb-4 text-center'>
                                            <div className='bg-muted mx-auto mb-4 flex h-16 w-16 transform items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110'>
                                                <file.icon className={`h-8 w-8 ${file.color}`} />
                                            </div>
                                            <CardTitle className='text-foreground text-xl font-semibold'>{file.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className='text-center'>
                                            <p className='text-muted-foreground'>{file.description}</p>
                                        </CardContent>
                                    </Card>
                                </MagicCard>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className='bg-muted/30 relative py-20' id='contact'>
                    <div className='container mx-auto px-4'>
                        <div className='mb-16 text-center'>
                            <h2 className='text-foreground mb-4 text-3xl font-bold md:text-4xl'>Contact Us</h2>
                            <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
                                Need help or more information? Our team is ready to assist you 24/7
                            </p>
                        </div>

                        <div className='mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3'>
                            <MagicCard className='group h-full' gradientColor={theme.theme === 'dark' ? '#262626' : '#D9D9D955'}>
                                <Card className='h-full border-0 bg-transparent shadow-none'>
                                    <CardHeader className='pb-4 text-center'>
                                        <div className='mx-auto mb-4 flex h-16 w-16 transform items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 transition-all duration-300 group-hover:scale-110'>
                                            <Phone className='h-8 w-8 text-white' />
                                        </div>
                                        <CardTitle className='text-foreground text-xl font-semibold'>Call Center</CardTitle>
                                    </CardHeader>
                                    <CardContent className='text-center'>
                                        <p className='text-muted-foreground mb-2'>(021) 345-7890</p>
                                        <p className='text-muted-foreground text-sm'>Monday - Friday, 08:00 - 17:00 WIB</p>
                                    </CardContent>
                                </Card>
                            </MagicCard>

                            <MagicCard className='group h-full' gradientColor={theme.theme === 'dark' ? '#262626' : '#D9D9D955'}>
                                <Card className='h-full border-0 bg-transparent shadow-none'>
                                    <CardHeader className='pb-4 text-center'>
                                        <div className='mx-auto mb-4 flex h-16 w-16 transform items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 transition-all duration-300 group-hover:scale-110'>
                                            <Mail className='h-8 w-8 text-white' />
                                        </div>
                                        <CardTitle className='text-foreground text-xl font-semibold'>Email Support</CardTitle>
                                    </CardHeader>
                                    <CardContent className='text-center'>
                                        <p className='text-muted-foreground mb-2'>complaints@rri.co.id</p>
                                        <p className='text-muted-foreground text-sm'>Response within 24 hours</p>
                                    </CardContent>
                                </Card>
                            </MagicCard>

                            <MagicCard className='group h-full' gradientColor={theme.theme === 'dark' ? '#262626' : '#D9D9D955'}>
                                <Card className='h-full border-0 bg-transparent shadow-none'>
                                    <CardHeader className='pb-4 text-center'>
                                        <div className='mx-auto mb-4 flex h-16 w-16 transform items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 transition-all duration-300 group-hover:scale-110'>
                                            <MapPin className='h-8 w-8 text-white' />
                                        </div>
                                        <CardTitle className='text-foreground text-xl font-semibold'>Head Office</CardTitle>
                                    </CardHeader>
                                    <CardContent className='text-center'>
                                        <p className='text-muted-foreground mb-2'>Jl. Medan Merdeka Barat No. 4-5</p>
                                        <p className='text-muted-foreground text-sm'>Jakarta Pusat 10110</p>
                                    </CardContent>
                                </Card>
                            </MagicCard>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className='relative py-20'>
                    <div className='container mx-auto px-4'>
                        <div className='mx-auto max-w-4xl text-center'>
                            <div className='group'>
                                <div className='from-primary to-primary/75 text-primary-foreground rounded-2xl bg-gradient-to-r p-12'>
                                    <div className='mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm'>
                                        <Heart className='h-8 w-8 text-white' />
                                    </div>

                                    <h2 className='mb-4 text-4xl font-bold'>Ready to Make Your Voice Heard?</h2>

                                    <p className='mb-8 text-xl text-blue-100'>
                                        Join thousands of satisfied users who trust our platform for their complaints and feedback.
                                    </p>

                                    <div className='flex flex-col justify-center gap-4 sm:flex-row'>
                                        <Button className='px-8 py-3 text-lg font-medium' size='lg' variant='secondary'>
                                            Get Started Now
                                            <Zap className='ml-2 h-5 w-5' />
                                        </Button>

                                        <Link href='/login'>
                                            <Button className='px-8 py-3 text-lg font-medium' size='lg'>
                                                Sign In
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className='bg-muted/50 border-border relative border-t py-12'>
                    <div className='container mx-auto px-4'>
                        <div className='flex flex-col items-center justify-between md:flex-row'>
                            <div className='mb-4 flex items-center space-x-3 md:mb-0'>
                                <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600'>
                                    <img alt='logo' src='/blue-logo.jpg' />
                                </div>
                                <div>
                                    <h3 className='text-foreground text-lg font-bold'>{page.props?.name}</h3>
                                    <p className='text-muted-foreground text-sm'>Radio Republik Indonesia</p>
                                </div>
                            </div>

                            <div className='text-center md:text-right'>
                                <p className='text-muted-foreground text-sm'>© 2025 Radio Republik Indonesia. All Rights Reserved.</p>
                                <p className='text-muted-foreground mt-1 text-xs'>Based on Director General Regulation No. 06 of 2023</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
