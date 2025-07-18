import { ComplaintForm } from '@/components/forms/ComplaintForm';
import { ModeToggle } from '@/components/mode-toggle';
import { Badge } from '@/components/ui/badge';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NeonGradientCard } from '@/components/ui/neon-gradient-card';
import { NumberTicker } from '@/components/ui/number-ticker';
import { Particles } from '@/components/ui/particles';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { usePage } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle,
    Clock,
    Eye,
    FileText,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    Radio,
    Scale,
    Shield,
    Star,
    Users,
    Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface LandingPageProps {
    stats?: {
        total_complaints: number;
        resolved_complaints: number;
        response_time_hours: number;
    };
}

export default function LandingPage({ stats }: LandingPageProps) {
    const [mounted, setMounted] = useState(false);
    const page = usePage();

    useEffect(() => {
        setMounted(true);
    }, []);

    const features = [
        {
            icon: Shield,
            title: 'Aman & Terpercaya',
            description: 'Data laporan Anda dijamin aman dengan enkripsi end-to-end dan sistem keamanan berlapis.',
        },
        {
            icon: Clock,
            title: 'Respon Cepat',
            description: 'Tim kami berkomitmen merespon setiap laporan dalam waktu maksimal 24 jam.',
        },
        {
            icon: Eye,
            title: 'Transparan',
            description: 'Pantau progress penanganan laporan Anda secara real-time dengan sistem tracking terintegrasi.',
        },
        {
            icon: Scale,
            title: 'Berdasarkan Hukum',
            description: 'Setiap laporan ditangani sesuai Peraturan Direktur Utama No. 06 Tahun 2023.',
        },
    ];

    const testimonials = [
        {
            name: 'Budi Santoso',
            role: 'Pendengar RRI Jakarta',
            content: 'Sistem pengaduan ini sangat membantu. Laporan saya ditanggapi dengan cepat dan profesional.',
            rating: 5,
        },
        {
            name: 'Siti Nurhaliza',
            role: 'Pendengar RRI Surabaya',
            content: 'Proses yang transparan dan mudah digunakan. Terima kasih RRI atas layanan yang excellent.',
            rating: 5,
        },
        {
            name: 'Ahmad Rahman',
            role: 'Pendengar RRI Medan',
            content: 'Interface yang user-friendly dan tim support yang sangat responsif. Highly recommended!',
            rating: 5,
        },
    ];

    if (!mounted) {
        return null;
    }

    return (
        <div className='bg-background text-foreground relative min-h-screen overflow-hidden'>
            {/* Particles Background */}
            <Particles className='absolute inset-0 -z-10' color='#1e40af' ease={80} quantity={100} refresh />

            {/* Header */}
            <header className='border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
                <div className='container mx-auto flex h-16 items-center justify-between px-4'>
                    <div className='flex items-center space-x-3'>
                        <div className='bg-primary flex h-10 w-10 items-center justify-center rounded-lg'>
                            <img alt='' src='blue-logo.jpg' />
                        </div>
                        <div>
                            <h1 className='text-foreground text-xl font-bold'>{page?.props?.name}</h1>
                            <p className='text-muted-foreground text-xs'>Radio Republik Indonesia</p>
                        </div>
                    </div>
                    <div className='flex items-center space-x-4'>
                        <nav className='hidden space-x-6 md:flex'>
                            <a className='text-muted-foreground hover:text-foreground transition-colors' href='#beranda'>
                                Beranda
                            </a>
                            <a className='text-muted-foreground hover:text-foreground transition-colors' href='#layanan'>
                                Layanan
                            </a>
                            <a className='text-muted-foreground hover:text-foreground transition-colors' href='#kontak'>
                                Kontak
                            </a>
                            <a
                                className='text-muted-foreground hover:text-foreground transition-colors'
                                href='https://ppid.rri.go.id'
                                target='_blank'
                            >
                                RRI Pusat
                            </a>
                        </nav>
                        <div className='flex items-center space-x-3'>
                            <a className='text-primary hover:text-primary/80 hidden font-medium transition-colors sm:block' href={route('login')}>
                                Login
                            </a>
                            <ModeToggle />
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className='relative pt-20 pb-20' id='beranda'>
                <div className='container mx-auto px-4'>
                    <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20'>
                        {/* Left Side - Hero Content */}
                        <div className='flex flex-col justify-start space-y-8 lg:py-16'>
                            <div className='space-y-6'>
                                <Badge className='w-fit px-4 py-2 text-sm' variant='secondary'>
                                    <Radio className='mr-2 h-4 w-4' />
                                    Sistem Pengaduan Resmi RRI
                                </Badge>

                                <h1 className='from-primary bg-gradient-to-r to-blue-600 bg-clip-text text-4xl leading-tight font-bold text-transparent md:text-5xl lg:text-6xl'>
                                    Suara Anda, Tanggung Jawab Kami
                                </h1>

                                <p className='text-muted-foreground text-lg leading-relaxed md:text-xl'>
                                    Platform resmi Radio Republik Indonesia untuk menerima, mengelola, dan menindaklanjuti pengaduan masyarakat. Kami
                                    berkomitmen memberikan layanan terbaik dengan transparansi dan akuntabilitas yang tinggi.
                                </p>
                            </div>

                            {/* Stats Section */}
                            {stats && (
                                <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                                    <NeonGradientCard className='p-6 text-center' neonColors={{ firstColor: '#1e40af', secondColor: '#3b82f6' }}>
                                        <div className='text-primary mb-2 text-3xl font-bold'>
                                            <NumberTicker value={stats.total_complaints} />
                                        </div>
                                        <p className='text-muted-foreground text-sm'>Total Laporan</p>
                                    </NeonGradientCard>

                                    <NeonGradientCard className='p-6 text-center' neonColors={{ firstColor: '#1e40af', secondColor: '#3b82f6' }}>
                                        <div className='mb-2 text-3xl font-bold text-blue-600 dark:text-blue-400'>
                                            <NumberTicker value={stats.resolved_complaints} />
                                        </div>
                                        <p className='text-muted-foreground text-sm'>Diselesaikan</p>
                                    </NeonGradientCard>

                                    <NeonGradientCard className='p-6 text-center' neonColors={{ firstColor: '#1e40af', secondColor: '#3b82f6' }}>
                                        <div className='mb-2 text-3xl font-bold text-blue-600 dark:text-blue-400'>
                                            <NumberTicker value={stats.response_time_hours} />
                                            <span className='text-lg'>h</span>
                                        </div>
                                        <p className='text-muted-foreground text-sm'>Rata-rata Respon</p>
                                    </NeonGradientCard>
                                </div>
                            )}

                            <div className='flex flex-col gap-4 sm:flex-row'>
                                <RainbowButton className='px-8 py-4 text-lg'>
                                    <FileText className='mr-2 h-5 w-5' />
                                    Buat Laporan
                                    <ArrowRight className='ml-2 h-5 w-5' />
                                </RainbowButton>

                                <Button className='px-8 py-4 text-lg' size='lg' variant='outline'>
                                    <MessageSquare className='mr-2 h-5 w-5' />
                                    Pelajari Lebih Lanjut
                                </Button>
                            </div>
                        </div>

                        {/* Right Side - Complaint Form */}
                        <div className='relative lg:py-8'>
                            <div className='sticky top-8'>
                                <Card className='relative overflow-hidden shadow-2xl'>
                                    <BorderBeam colorFrom='#1e40af' colorTo='#3b82f6' duration={15} size={300} />
                                    <CardHeader className='bg-primary/5 py-4 text-center'>
                                        <CardTitle className='text-2xl font-bold'>Form Pengaduan</CardTitle>
                                        <CardDescription className='text-lg'>Sampaikan keluhan atau saran Anda dengan mudah dan aman</CardDescription>
                                    </CardHeader>
                                    <CardContent className='p-6'>
                                        <ComplaintForm />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className='bg-muted/30 relative py-20' id='layanan'>
                <div className='container mx-auto px-4'>
                    <div className='mb-16 text-center'>
                        <h2 className='text-foreground mb-4 text-3xl font-bold md:text-4xl'>Mengapa Memilih Kami?</h2>
                        <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
                            Komitmen kami untuk memberikan layanan pengaduan terbaik dengan standar profesional tinggi
                        </p>
                    </div>

                    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
                        {features.map((feature, index) => (
                            <Card className='group relative transition-all duration-300 hover:shadow-xl' key={index}>
                                <BorderBeam delay={index * 3} duration={12} size={250} />
                                <CardContent className='p-6 text-center'>
                                    <div className='bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full'>
                                        <feature.icon className='text-primary h-6 w-6' />
                                    </div>
                                    <h3 className='text-foreground mb-2 text-lg font-semibold'>{feature.title}</h3>
                                    <p className='text-muted-foreground text-sm'>{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className='relative py-20'>
                <div className='container mx-auto px-4'>
                    <div className='mb-16 text-center'>
                        <h2 className='text-foreground mb-4 text-3xl font-bold md:text-4xl'>Apa Kata Mereka</h2>
                        <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
                            Testimoni dari pengguna yang telah merasakan layanan pengaduan RRI
                        </p>
                    </div>

                    <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                        {testimonials.map((testimonial, index) => (
                            <Card className='group relative transition-all duration-300 hover:shadow-xl' key={index}>
                                <BorderBeam delay={index * 3} duration={12} size={250} />
                                <CardContent className='p-6'>
                                    <div className='mb-4 flex space-x-1'>
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star className='h-5 w-5 fill-yellow-400 text-yellow-400' key={i} />
                                        ))}
                                    </div>
                                    <p className='text-muted-foreground mb-4 italic'>"{testimonial.content}"</p>
                                    <div>
                                        <h4 className='text-foreground font-semibold'>{testimonial.name}</h4>
                                        <p className='text-muted-foreground text-sm'>{testimonial.role}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className='bg-muted/30 relative py-20'>
                <div className='container mx-auto px-4'>
                    <div className='mb-16 text-center'>
                        <h2 className='text-foreground mb-4 text-3xl font-bold md:text-4xl'>Keunggulan Platform Kami</h2>
                        <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>Pengalaman pengaduan yang mudah, cepat, dan terpercaya</p>
                    </div>

                    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                        <Card className='group relative p-6 transition-all duration-300 hover:shadow-xl'>
                            <div className='bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full'>
                                <Zap className='text-primary h-6 w-6' />
                            </div>
                            <h3 className='text-foreground mb-2 text-lg font-semibold'>Proses Otomatis</h3>
                            <p className='text-muted-foreground text-sm'>Sistem otomatis yang memproses laporan dengan efisien dan akurat</p>
                        </Card>

                        <Card className='group relative p-6 transition-all duration-300 hover:shadow-xl'>
                            <div className='bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full'>
                                <Users className='text-primary h-6 w-6' />
                            </div>
                            <h3 className='text-foreground mb-2 text-lg font-semibold'>Tim Profesional</h3>
                            <p className='text-muted-foreground text-sm'>Ditangani oleh tim berpengalaman dengan standar pelayanan tinggi</p>
                        </Card>

                        <Card className='group relative p-6 transition-all duration-300 hover:shadow-xl'>
                            <div className='bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full'>
                                <CheckCircle className='text-primary h-6 w-6' />
                            </div>
                            <h3 className='text-foreground mb-2 text-lg font-semibold'>Hasil Terjamin</h3>
                            <p className='text-muted-foreground text-sm'>Komitmen menyelesaikan setiap laporan dengan hasil yang memuaskan</p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className='bg-background border-border relative border-t py-20' id='kontak'>
                <div className='container mx-auto px-4'>
                    <div className='mb-16 text-center'>
                        <h2 className='text-foreground mb-4 text-3xl font-bold md:text-4xl'>Hubungi Kami</h2>
                        <p className='text-muted-foreground mx-auto max-w-2xl text-xl'>
                            Butuh bantuan atau informasi lebih lanjut? Tim kami siap membantu Anda 24/7
                        </p>
                    </div>

                    <div className='mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3'>
                        <Card className='group p-6 text-center transition-all duration-300 hover:shadow-xl'>
                            <BorderBeam duration={10} size={200} />
                            <div className='bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
                                <Phone className='text-primary h-8 w-8' />
                            </div>
                            <h3 className='mb-2 text-lg font-semibold'>Call Center</h3>
                            <p className='text-muted-foreground mb-2'>(021) 345-7890</p>
                            <p className='text-muted-foreground text-sm'>Senin - Jumat, 08:00 - 17:00 WIB</p>
                        </Card>

                        <Card className='group p-6 text-center transition-all duration-300 hover:shadow-xl'>
                            <BorderBeam delay={2} duration={10} size={200} />
                            <div className='bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
                                <Mail className='text-primary h-8 w-8' />
                            </div>
                            <h3 className='mb-2 text-lg font-semibold'>Email Support</h3>
                            <p className='text-muted-foreground mb-2'>pengaduan@rri.co.id</p>
                            <p className='text-muted-foreground text-sm'>Respon dalam 24 jam</p>
                        </Card>

                        <Card className='group p-6 text-center transition-all duration-300 hover:shadow-xl'>
                            <BorderBeam delay={4} duration={10} size={200} />
                            <div className='bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
                                <MapPin className='text-primary h-8 w-8' />
                            </div>
                            <h3 className='mb-2 text-lg font-semibold'>Kantor Pusat</h3>
                            <p className='text-muted-foreground mb-2'>Jl. Medan Merdeka Barat No. 4-5</p>
                            <p className='text-muted-foreground text-sm'>Jakarta Pusat 10110</p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className='bg-muted/50 border-border relative border-t py-12'>
                <div className='container mx-auto px-4'>
                    <div className='flex flex-col items-center justify-between md:flex-row'>
                        <div className='mb-4 flex items-center space-x-3 md:mb-0'>
                            <div className='bg-primary flex h-8 w-8 items-center justify-center rounded-lg'>
                                <Radio className='text-primary-foreground h-5 w-5' />
                            </div>
                            <div>
                                <h3 className='text-foreground text-lg font-bold'>RRI Complaint System</h3>
                                <p className='text-muted-foreground text-sm'>Radio Republik Indonesia</p>
                            </div>
                        </div>

                        <div className='text-center md:text-right'>
                            <p className='text-muted-foreground text-sm'>© 2025 Radio Republik Indonesia. Hak Cipta Dilindungi.</p>
                            <p className='text-muted-foreground mt-1 text-xs'>Berdasarkan Peraturan Direktur Utama No. 06 Tahun 2023</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
