# RRI Complaint System

## 📻 Sistem Pengaduan Masyarakat RRI

Sistem Pengaduan Masyarakat untuk **Lembaga Penyiaran Publik Radio Republik Indonesia (RRI)** berdasarkan Peraturan Direktur Utama No. 06 Tahun 2023 tentang Pelayanan Pengaduan Masyarakat dan Konsultasi.

### 🎯 Tujuan Proyek

Menyediakan platform digital yang memungkinkan masyarakat untuk menyampaikan pengaduan, saran, dan konsultasi terkait pelayanan RRI secara transparan, responsif, dan akuntabel sesuai dengan amanat peraturan perundang-undangan.

## 🌟 Fitur Utama

### 👥 Untuk Masyarakat (Guest)
- **Formulir Pengaduan Bertahap**: Interface yang user-friendly dengan stepper form
- **Upload Bukti**: Kemampuan mengunggah file pendukung (gambar/video)
- **Tracking Pengaduan**: Nomor registrasi untuk memantau status pengaduan
- **Notifikasi**: Pemberitahuan otomatis via email

### 🏢 Untuk Admin RRI
- **Dashboard Komprehensif**: Overview statistik dan status pengaduan
- **Manajemen Pengaduan**: Pemrosesan, assignment, dan update status
- **Laporan**: Generate laporan pengaduan berkala
- **Manajemen Pengguna**: Kelola akun karyawan (khusus SuperAdmin)

## 🛠️ Teknologi

| Kategori | Teknologi |
|----------|-----------|
| **Backend** | Laravel 11, PHP 8.2+ |
| **Frontend** | ReactJS 18, TypeScript |
| **Database** | MariaDB |
| **UI Framework** | Tailwind CSS, Shadcn/UI, MagicUI |
| **State Management** | TanStack Query |
| **Form Management** | React Hook Form + Zod |
| **Stepper Component** | Stepperize |
| **Containerization** | Docker & Docker Compose |

## 🏗️ Arsitektur

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │────│   Laravel API   │────│   MariaDB       │
│   (TypeScript)  │    │   (PHP)         │    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌────▼────┐             ┌────▼────┐             ┌────▼────┐
    │ Stepper │             │ Service │             │ Storage │
    │ Forms   │             │ Repo    │             │ Files   │
    └─────────┘             │ Pattern │             └─────────┘
                            └─────────┘
```

## 🚀 Quick Start

### Prasyarat

- **Docker** & **Docker Compose**
- **Git**
- **Node.js 18+** (untuk development lokal)
- **PHP 8.2+** (untuk development lokal)

### Instalasi

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd rri-complaint-system
   ```

2. **Setup Environment**
   ```bash
   cp .env.example .env
   # Edit konfigurasi database dan aplikasi di .env
   ```

3. **Build & Start Containers**
   ```bash
   docker-compose up -d --build
   ```

4. **Install Dependencies**
   ```bash
   # Backend dependencies
   ./dc.sh composer install
   
   # Frontend dependencies
   npm install
   ```

5. **Setup Database**
   ```bash
   # Generate application key
   ./dc.sh php artisan key:generate
   
   # Run migrations
   ./dc.sh php artisan migrate
   
   # Seed initial data
   ./dc.sh php artisan db:seed
   ```

6. **Build Frontend Assets**
   ```bash
   npm run build
   # atau untuk development
   npm run dev
   ```

7. **Akses Aplikasi**
   - **Website Publik**: http://localhost:8000
   - **Admin Dashboard**: http://localhost:8000/admin
   - **API Documentation**: http://localhost:8000/api/documentation

### Development Commands

```bash
# Start development server
npm run dev

# Run tests
./dc.sh php artisan test

# Check code quality
npm run lint
./dc.sh composer run-script cs

# Database operations
./dc.sh php artisan migrate:fresh --seed
./dc.sh php artisan tinker
```

## 📋 Penggunaan

### 🔍 Untuk Masyarakat

1. **Akses Website**: Buka http://localhost:8000
2. **Isi Formulir**: Ikuti langkah-langkah pada stepper form:
   - **Step 1**: Informasi Pelapor (nama, identitas, kontak)
   - **Step 2**: Detail Kejadian (judul, deskripsi, waktu, pihak terkait)
   - **Step 3**: Upload Bukti (opsional - foto/video)
3. **Submit**: Klik "Kirim Pengaduan"
4. **Dapatkan Nomor Registrasi**: Simpan nomor untuk tracking

### 👨‍💼 Untuk Admin

1. **Login Admin**: Akses `/admin` dengan kredensial admin
2. **Dashboard**: Lihat overview pengaduan dan statistik
3. **Kelola Pengaduan**:
   - Review pengaduan baru
   - Update status (pending → in_progress → resolved)
   - Assign ke karyawan
   - Tambah respons/komentar
4. **Laporan**: Generate laporan berkala
5. **Manajemen User** (SuperAdmin): Tambah/edit akun karyawan

## 🎨 Desain & Branding

### Warna RRI
```css
Primary: #1e40af (RRI Blue)
Secondary: #dc2626 (RRI Red)
Accent: #f59e0b (RRI Gold)
Neutral: #1e293b (RRI Navy)
```

### Logo & Asset
- Logo resmi RRI dengan tagline "Sekali Di Udara Tetap Di Udara"
- Menggunakan font Inter untuk keterbacaan optimal
- Design system mengikuti standar pemerintahan Indonesia

## 📊 Struktur Database

### Tabel Utama

**Users** (Pengguna Sistem)
- SuperAdmin: Akses penuh sistem
- Employee: Mengelola pengaduan yang di-assign

**Complaints** (Pengaduan)
- Data pelapor dan identitas
- Detail kejadian/keluhan
- Status dan assignment
- Timestamp untuk tracking

**Evidence** (Bukti Pendukung)
- File attachment (JPG, PNG, MP4)
- Relasi ke complaint
- Metadata file untuk security

## 🔐 Keamanan

### Data Protection
- **Enkripsi**: Data sensitif dienkripsi
- **Validation**: Input validation di frontend dan backend
- **File Security**: Validasi tipe file dan scan malware
- **Access Control**: Role-based permission system

### Compliance
- **GDPR Ready**: Sesuai standar perlindungan data
- **Government Standards**: Mengikuti standar keamanan pemerintah
- **Audit Trail**: Logging semua aktivitas sistem

## 📈 Monitoring & Analytics

### Metrics
- Jumlah pengaduan per periode
- Response time rata-rata
- Satisfaction score
- Kategori pengaduan terpopuler

### Reporting
- **Daily**: Laporan harian pengaduan baru
- **Weekly**: Summary mingguan dengan trend analysis
- **Monthly**: Laporan komprehensif untuk manajemen
- **Custom**: Generate laporan dengan filter khusus

## 🌍 Informasi RRI Pontianak

### Alamat & Kontak
```
RRI Pontianak
Jl. Ahmad Yani No. 1
Pontianak Kota, Kalimantan Barat 78124

Telepon: +62 561 732 123
Email: pontianak@rri.co.id
Website: https://rri.co.id

Jam Operasional:
Senin - Jumat: 08:00 - 16:00 WIB
Sabtu - Minggu: Tutup
```

### Program Unggulan
- **Siaran Berita**: Setiap jam dengan bahasa Indonesia dan daerah
- **Dialog Interaktif**: Diskusi isu publik (10:00-11:00)
- **Musik Nusantara**: Showcase musik tradisional (Minggu 14:00-16:00)
- **Pojok Daerah**: Program budaya dan komunitas lokal (15:00-16:00)

## 📝 Kategori Pengaduan

### Konten Siaran
- Kualitas audio/suara
- Konten tidak sesuai
- Bahasa tidak pantas
- Informasi tidak akurat

### Pelayanan
- Respon customer service
- Akses informasi
- Transparansi
- Keterlambatan siaran

### Fasilitas
- Gangguan sinyal
- Website/aplikasi
- Fasilitas kantor
- Akses difabel

### SDM
- Perilaku pegawai
- Profesionalisme
- Etika penyiaran
- Diskriminasi

## 🤝 Kontribusi

### Development Workflow
1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

### Code Standards
- **PSR-12** untuk PHP code
- **ESLint + Prettier** untuk TypeScript/React
- **Conventional Commits** untuk commit messages
- **PHPUnit** untuk backend testing
- **Jest + Testing Library** untuk frontend testing

## 📄 Dokumentasi Teknis

### API Documentation
- **Endpoint Reference**: `/api/documentation`
- **Postman Collection**: `docs/postman/`
- **OpenAPI Spec**: `docs/api/openapi.yaml`

### Deployment Guide
- **Production Setup**: `docs/deployment/production.md`
- **Docker Guide**: `docs/deployment/docker.md`
- **Server Requirements**: `docs/deployment/requirements.md`

## 🆘 Troubleshooting

### Common Issues

**Database Connection Error**
```bash
# Check database container
docker-compose ps database

# Restart database
docker-compose restart database
```

**Permission Denied (EACCESS)**
```bash
# Use dc.sh script instead of direct docker commands
./dc.sh php artisan migrate
```

**Frontend Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**File Upload Issues**
```bash
# Check storage permissions
./dc.sh php artisan storage:link
chmod -R 755 storage/
```

## 📞 Support

### Tim Development
- **Tech Lead**: [Nama] - [email]
- **Backend Developer**: [Nama] - [email]
- **Frontend Developer**: [Nama] - [email]
- **DevOps Engineer**: [Nama] - [email]

### RRI Contact
- **IT Support**: it-support@rri.co.id
- **Humas**: humas.pontianak@rri.co.id
- **Direktur**: direktur.pontianak@rri.co.id

## 📋 Roadmap

### Phase 1 (Current)
- ✅ Basic complaint form
- ✅ Admin dashboard
- ✅ File upload functionality
- ✅ Email notifications

### Phase 2 (Planned)
- 🔄 Mobile responsive optimization
- 🔄 Advanced reporting
- 🔄 API integrations
- 🔄 Multi-language support

### Phase 3 (Future)
- 📋 Mobile app
- 📋 AI-powered categorization
- 📋 Voice complaint submission
- 📋 Integration with other government systems

## 📜 License

Proyek ini dikembangkan untuk **Lembaga Penyiaran Publik Radio Republik Indonesia (RRI)** berdasarkan:

- Peraturan Direktur Utama RRI No. 06 Tahun 2023
- UU No. 32 Tahun 2002 tentang Penyiaran
- UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik
- UU No. 25 Tahun 2009 tentang Pelayanan Publik

---

## 🙏 Acknowledgments

Terima kasih kepada:
- **RRI Management** atas kepercayaan dan dukungan
- **Malang State Polytechnic** atas kerja sama akademik
- **Open Source Community** atas tools dan libraries yang digunakan
- **Indonesian Government** atas framework regulasi yang jelas

---

> **"Sekali Di Udara Tetap Di Udara"** - RRI menjaga komitmen pelayanan publik melalui inovasi teknologi untuk transparansi dan akuntabilitas yang lebih baik.

**🔗 Links Penting:**
- [RRI Official Website](https://rri.co.id)
- [Peraturan RRI](https://rri.co.id/peraturan)
- [PPID RRI](https://ppid.rri.go.id)
- [GitHub Repository](https://github.com/rri/complaint-system)