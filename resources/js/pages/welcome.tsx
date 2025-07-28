import { ComplaintForm } from '@/components/forms/ComplaintForm';
import { ModeToggle } from '@/components/mode-toggle';
import { useTheme } from '@/components/theme-provider';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MagicCard } from '@/components/ui/magic-card';
import { Meteors } from '@/components/ui/meteors';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Clock, Eye, File, FileImage, Mail, MapPin, Music, Phone, Scale, Shield } from 'lucide-react';

export default function Welcome() {
    const page = usePage<SharedData>();
    console.log(page);

    const theme = useTheme();
    const isAuthenticated = !!page.props.auth?.user;

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
        // {
        //     icon: FileVideo,
        //     title: 'Videos',
        //     description: 'MP4, AVI, MOV, WebM',
        //     color: 'text-purple-500',
        // },
        {
            icon: Music,
            title: 'Audio',
            description: 'MP3, WAV, FLAC, AAC, OGG',
            color: 'text-pink-500',
        },
        {
            icon: File,
            title: 'Documents',
            description: 'PDF, DOC, DOCX, TXT, RTF',
            color: 'text-green-500',
        },
        // {
        //     icon: Upload,
        //     title: 'Large Files',
        //     description: 'Up to 100MB per file',
        //     color: 'text-orange-500',
        // },
    ];

    // const stats = [
    //     {
    //         icon: Award,
    //         number: '1000+',
    //         label: 'Complaints Resolved',
    //         color: 'from-yellow-400 to-orange-500',
    //     },
    //     {
    //         icon: Star,
    //         number: '4.9/5',
    //         label: 'Customer Satisfaction',
    //         color: 'from-green-400 to-emerald-500',
    //     },
    //     {
    //         icon: Clock,
    //         number: '24/7',
    //         label: 'Support Available',
    //         color: 'from-blue-400 to-cyan-500',
    //     },
    //     {
    //         icon: CheckCircle,
    //         number: '99.9%',
    //         label: 'Uptime Guarantee',
    //         color: 'from-purple-400 to-pink-500',
    //     },
    // ];

    return (
        <>
            <Head title=' RRI PONTIANAK ' />

            <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'>
                {/* Header */}
                <motion.header
                    animate={{ opacity: 1, y: 0 }}
                    className='border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'
                    initial={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <div className='container mx-auto flex h-16 items-center justify-between px-4'>
                        <motion.div
                            animate={{ opacity: 1, x: 0 }}
                            className='flex items-center space-x-3'
                            initial={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className='flex items-center justify-center gap-4 rounded-lg'>
                                <img alt='logo' className='h-10' src='/blue-main-logo.png' />
                                <img alt='logo' className='h-10' src='/pro1.png' />
                                <img alt='logo' className='h-10' src='/pro2.png' />
                                <img alt='logo' className='h-10' src='/pro4.png' />
                            </div>
                        </motion.div>
                        <motion.div
                            animate={{ opacity: 1, x: 0 }}
                            className='flex items-center space-x-4'
                            initial={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <nav className='hidden space-x-6 md:flex'>
                                <a className='text-muted-foreground hover:text-foreground transition-colors' href='#home'>
                                    Beranda
                                </a>
                                <a className='text-muted-foreground hover:text-foreground transition-colors' href='#features'>
                                    Layanan
                                </a>
                                <a className='text-muted-foreground hover:text-foreground transition-colors' href='#contact'>
                                    Kontak
                                </a>
                                <a
                                    className='text-muted-foreground hover:text-foreground transition-colors'
                                    href='https://ppid.rri.go.id/pengaduan'
                                    target='_blank'
                                >
                                    PPID
                                </a>
                            </nav>
                            <div className='flex items-center space-x-3'>
                                {isAuthenticated ? (
                                    <Link className={buttonVariants({ variant: 'default', className: 'font-medium' })} href='/dashboard'>
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link href='/login'>
                                        <Button className='font-medium' variant='default'>
                                            Login
                                        </Button>
                                    </Link>
                                )}
                                <ModeToggle />
                            </div>
                        </motion.div>
                    </div>
                </motion.header>

                {/* Hero Section with Form */}
                <section className='relative pt-8 pb-20' id='home'>
                    <Meteors number={30} />
                    <div className='container mx-auto px-4'>
                        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20'>
                            {/* Left Side - Hero Content */}
                            <motion.div
                                animate={{ opacity: 1, x: 0 }}
                                className='flex flex-col space-y-8'
                                initial={{ opacity: 0, x: -60 }}
                                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                            >
                                <motion.div
                                    animate={{ opacity: 1 }}
                                    className='space-y-6'
                                    initial={{ opacity: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    {/* <motion.div
                                        animate={{ opacity: 1, y: 0 }}
                                        initial={{ opacity: 0, y: 30 }}
                                        transition={{ duration: 0.6, delay: 0.5 }}
                                    >
                                        <Badge className='w-fit px-4 py-2 text-sm' variant='secondary'>
                                            <Radio className='mr-2 h-4 w-4' />
                                            Official RRI Complaint System
                                        </Badge>
                                    </motion.div> */}
                                    <img alt='logo' className='size-100' src='/blue-logo.png' />
                                    <motion.h1
                                        animate={{ opacity: 1, y: 0 }}
                                        className='text-4xl leading-tight font-bold tracking-tight md:text-5xl lg:text-6xl'
                                        initial={{ opacity: 0, y: 30 }}
                                        transition={{ duration: 0.6, delay: 0.6 }}
                                    >
                                        <span className='from-primary to-primary/55 bg-gradient-to-r bg-clip-text text-transparent'>DILAPOMAS</span>
                                        <br />
                                        <span className='bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-300'>
                                            RRI PONTIANAK
                                        </span>
                                    </motion.h1>

                                    <motion.p
                                        animate={{ opacity: 1, y: 0 }}
                                        className='text-muted-foreground text-lg leading-relaxed md:text-xl'
                                        initial={{ opacity: 0, y: 30 }}
                                        transition={{ duration: 0.6, delay: 0.7 }}
                                    >
                                        Suara Anda, Tanggung Jawab Kami
                                        <br />
                                        <br />
                                        Website Pengaduan Masyarakat RRI Pontianak untuk menerima, mengelola, dan menindaklanjuti pengaduan
                                        masyarakat. Kami berkomitmen untuk memberikan layanan terbaik dengan transparansi dan akuntabilitas yang
                                        tinggi.
                                        <br />
                                        <br />
                                        Layanan Pengaduan Masyarakat RRI Pontianak
                                    </motion.p>
                                </motion.div>

                                {/* Stats Section */}
                                <motion.div
                                    animate={{ opacity: 1, y: 0 }}
                                    className='grid grid-cols-2 gap-4 sm:grid-cols-4'
                                    initial={{ opacity: 0, y: 30 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                >
                                    {/* {stats.map((stat, index) => (
                                        <motion.div
                                            animate={{ opacity: 1, scale: 1 }}
                                            className='text-center'
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            key={index}
                                            transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <div
                                                className={`mx-auto mb-2 h-12 w-12 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                                            >
                                                <stat.icon className='h-6 w-6 text-white' />
                                            </div>
                                            <div className='text-foreground text-2xl font-bold'>{stat.number}</div>
                                            <p className='text-muted-foreground text-xs'>{stat.label}</p>
                                        </motion.div>
                                    ))} */}
                                </motion.div>
                                {/* 
                                <motion.div
                                    animate={{ opacity: 1, y: 0 }}
                                    className='flex flex-col gap-4 sm:flex-row'
                                    initial={{ opacity: 0, y: 30 }}
                                    transition={{ duration: 0.6, delay: 1.2 }}
                                >
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            className='from-primary to-primary/75 text-primary-foreground bg-gradient-to-r px-8 py-4 text-lg font-medium'
                                            size='lg'
                                        >
                                            <FileText className='mr-2 h-5 w-5' />
                                            Buat Laporan
                                            <ArrowRight className='ml-2 h-5 w-5' />
                                        </Button>
                                    </motion.div>

                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button className='border-1 bg-white px-8 py-4 text-lg font-medium text-black hover:bg-white' size='lg'>
                                            <MessageCircle className='mr-2 h-5 w-5' />
                                            Learn More
                                        </Button>
                                    </motion.div>
                                </motion.div> */}
                            </motion.div>

                            {/* Right Side - Complaint Form */}
                            <motion.div
                                animate={{ opacity: 1, x: 0 }}
                                className='relative lg:py-8'
                                initial={{ opacity: 0, x: 60 }}
                                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                            >
                                <ComplaintForm />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                {/* <motion.section
                    className='bg-muted/30 relative py-20'
                    id='features'
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: '-100px' }}
                    whileInView={{ opacity: 1 }}
                >
                    <div className='container mx-auto px-4'>
                        <motion.div
                            className='mb-16 text-center'
                            initial={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <h2 className='text-foreground mb-4 text-3xl font-bold md:text-4xl'>Why Choose Our System?</h2>
                            <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
                                Our commitment to providing the best complaint service with high professional standards
                            </p>
                        </motion.div>

                        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
                            {features.map((feature, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    key={index}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                >
                                    <MagicCard className='group h-full' gradientColor={theme.theme === 'dark' ? '#262626' : '#D9D9D955'}>
                                        <Card className='h-full border-0 bg-transparent shadow-none'>
                                            <CardHeader className='pb-4 text-center'>
                                                <motion.div
                                                    className={`mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.color} flex transform items-center justify-center transition-all duration-300 group-hover:scale-110`}
                                                    whileHover={{ rotate: 5 }}
                                                >
                                                    <feature.icon className='h-8 w-8 text-white' />
                                                </motion.div>
                                                <CardTitle className='text-foreground text-xl font-semibold'>{feature.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent className='text-center'>
                                                <p className='text-muted-foreground'>{feature.description}</p>
                                            </CardContent>
                                        </Card>
                                    </MagicCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section> */}

                {/* Supported Files Section */}
                <motion.section
                    className='relative py-20'
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: '-100px' }}
                    whileInView={{ opacity: 1 }}
                >
                    <div className='container mx-auto px-4'>
                        <motion.div
                            className='mb-16 text-center'
                            initial={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <h2 className='text-foreground mb-4 text-3xl font-bold md:text-4xl'>Dukungan Bukti Komprehensif</h2>
                            <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>Unggah berbagai jenis file sebagai bukti keluhan Anda</p>
                        </motion.div>

                        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                            {supportedFiles.map((file, index) => (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    key={index}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                >
                                    <MagicCard className='group h-full' gradientColor={theme.theme === 'dark' ? '#262626' : '#D9D9D955'}>
                                        <Card className='h-full border-0 bg-transparent shadow-none'>
                                            <CardHeader className='pb-4 text-center'>
                                                <motion.div
                                                    className='bg-muted mx-auto mb-4 flex h-16 w-16 transform items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110'
                                                    whileHover={{ rotate: -5 }}
                                                >
                                                    <file.icon className={`h-8 w-8 ${file.color}`} />
                                                </motion.div>
                                                <CardTitle className='text-foreground text-xl font-semibold'>{file.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent className='text-center'>
                                                <p className='text-muted-foreground'>{file.description}</p>
                                            </CardContent>
                                        </Card>
                                    </MagicCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Contact Section */}
                <motion.section
                    className='bg-muted/30 relative py-20'
                    id='contact'
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: '-100px' }}
                    whileInView={{ opacity: 1 }}
                >
                    <div className='container mx-auto px-4'>
                        <motion.div
                            className='mb-16 text-center'
                            initial={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <h2 className='text-foreground mb-4 text-3xl font-bold md:text-4xl'>Hubungi Kami</h2>
                            <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
                                Butuh bantuan atau informasi lebih lanjut?
                                <span className='text-muted-foreground mx-auto max-w-2xl text-xl'>Tim kami siap membantu Anda 24/7</span>
                            </p>
                        </motion.div>

                        <div className='mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3'>
                            {[
                                {
                                    icon: Phone,
                                    title: 'Call Center',
                                    content: '0811 5701 042',
                                    subtitle: 'Senin - Jumlat, 09:00 - 16:00 WIB',
                                    color: 'from-blue-500 to-cyan-500',
                                },
                                {
                                    icon: Mail,
                                    title: 'Email',
                                    content: 'laporrripontianak@gmail.com',
                                    subtitle: 'Respon dalam 24 jam',
                                    color: 'from-green-500 to-emerald-500',
                                },
                                {
                                    icon: MapPin,
                                    title: 'Kantor RRI Pontianak',
                                    content: 'Jalan Jenderal Sudirman No.7',
                                    subtitle: 'Pontianak - 78111',
                                    color: 'from-purple-500 to-pink-500',
                                },
                            ].map((contact, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    key={index}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                >
                                    <MagicCard className='group h-full' gradientColor={theme.theme === 'dark' ? '#262626' : '#D9D9D955'}>
                                        <Card className='h-full border-0 bg-transparent shadow-none'>
                                            <CardHeader className='pb-4 text-center'>
                                                <motion.div
                                                    className={`mx-auto mb-4 flex h-16 w-16 transform items-center justify-center rounded-2xl bg-gradient-to-br ${contact.color} transition-all duration-300 group-hover:scale-110`}
                                                    whileHover={{ rotate: 10 }}
                                                >
                                                    <contact.icon className='h-8 w-8 text-white' />
                                                </motion.div>
                                                <CardTitle className='text-foreground text-xl font-semibold'>{contact.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent className='text-center'>
                                                <p className='text-muted-foreground mb-2'>{contact.content}</p>
                                                <p className='text-muted-foreground text-sm'>{contact.subtitle}</p>
                                            </CardContent>
                                        </Card>
                                    </MagicCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* CTA Section */}
                {/* <motion.section
                    className='relative py-20'
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: '-100px' }}
                    whileInView={{ opacity: 1 }}
                >
                    <div className='container mx-auto px-4'>
                        <motion.div
                            className='mx-auto max-w-4xl text-center'
                            initial={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            whileInView={{ opacity: 1, scale: 1 }}
                        >
                            <motion.div className='group' transition={{ type: 'spring', stiffness: 300 }} whileHover={{ scale: 1.02 }}>
                                <div className='from-primary to-primary/75 text-primary-foreground rounded-2xl bg-gradient-to-r p-12'>
                                    <motion.div
                                        className='mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm'
                                        initial={{ scale: 0, rotate: -180 }}
                                        transition={{ duration: 0.8, delay: 0.3, ease: 'backOut' }}
                                        viewport={{ once: true }}
                                        whileInView={{ scale: 1, rotate: 0 }}
                                    >
                                        <Heart className='h-8 w-8 text-white' />
                                    </motion.div>

                                    <motion.h2
                                        className='mb-4 text-4xl font-bold'
                                        initial={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                        viewport={{ once: true }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                    >
                                        Ready to Make Your Voice Heard?
                                    </motion.h2>

                                    <motion.p
                                        className='mb-8 text-xl text-blue-100'
                                        initial={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.6, delay: 0.5 }}
                                        viewport={{ once: true }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                    >
                                        Join thousands of satisfied users who trust our platform for their complaints and feedback.
                                    </motion.p>

                                    <motion.div
                                        className='flex flex-col justify-center gap-4 sm:flex-row'
                                        initial={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.6, delay: 0.6 }}
                                        viewport={{ once: true }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                    >
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button className='px-8 py-3 text-lg font-medium' size='lg' variant='secondary'>
                                                Get Started Now
                                                <Zap className='ml-2 h-5 w-5' />
                                            </Button>
                                        </motion.div>

                                        {isAuthenticated ? (
                                            <Link href='/dashboard'>
                                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                    <Button className='px-8 py-3 text-lg font-medium' size='lg'>
                                                        Go to Dashboard
                                                    </Button>
                                                </motion.div>
                                            </Link>
                                        ) : (
                                            <Link href='/login'>
                                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                    <Button className='px-8 py-3 text-lg font-medium' size='lg'>
                                                        Sign In
                                                    </Button>
                                                </motion.div>
                                            </Link>
                                        )}
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.section> */}

                {/* Footer */}
                <motion.footer
                    className='bg-muted/50 border-border relative border-t py-12'
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1 }}
                >
                    <div className='container mx-auto px-4'>
                        <motion.div
                            className='flex flex-col items-center justify-between md:flex-row'
                            initial={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <motion.div
                                className='mb-4 flex items-center space-x-3 md:mb-0'
                                transition={{ type: 'spring', stiffness: 300 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className='flex h-8 w-8 items-center justify-center rounded-lg'>
                                    <img alt='logo' src='/blue-logo.png' />
                                </div>
                                <div>
                                    <h3 className='text-foreground text-lg font-bold'>{page.props?.name}</h3>
                                    <p className='text-muted-foreground text-sm'>Layanan Pengaduan RRI Pontianak</p>
                                </div>
                            </motion.div>

                            <div className='text-center md:text-right'>
                                <p className='text-muted-foreground text-sm'>© 2025 Radio Republik Indonesia. All Rights Reserved.</p>
                                <p className='text-muted-foreground mt-1 text-xs'>Based on Director General Regulation No. 06 of 2023</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.footer>
            </div>
        </>
    );
}
