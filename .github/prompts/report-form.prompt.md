# RRI Complaint System - Project Instructions

This document provides detailed technical instructions for developing the RRI (Radio Republik Indonesia) complaint management system.

## Project Context

This is a Laravel 12 and ReactJS project with a focus on modularity, maintainability, and scalability. The project is designed to handle public complaints for Radio Republik Indonesia through a repository-service pattern and an intent-based system for routing requests.

The main business process is a complaint management application for RRI based on Peraturan Direktur Utama No. 06 Tahun 2023. The system handles two types of complaints:

1. **Pengaduan Berkadar Pengawasan** (Surveillance-based complaints)
2. **Pengaduan Tidak Berkadar Pengawasan** (Non-surveillance complaints)

The project is built with TypeScript for the frontend, Laravel 12 for the backend, and is containerized with Docker for simplified development and production environments.

## Stack

- **Backend**: Laravel 12
- **Frontend**: ReactJS with TypeScript
- **Inertia**: Laravel and ReactJS adapter
- **Database**: MariaDB
- **UI Components**: Shadcn/UI, MagicUI
- **Form Stepper**: Stepperize (https://stepperize.vercel.app/)
- **State Management**: TanStack Query
- **Validation**: Zod (frontend), Laravel Requests (backend)
- **Containerization**: Docker

Note: This is a TypeScript project running on Windows with Docker environment.

## Crucial Dependencies

### Backend

- **laravel-repository-service-pattern**: `adobrovolsky97/laravel-repository-service-pattern` - handles service and repository processes, decouples business logic from data storage implementation

### Frontend

- **@tanstack/react-query**: Handles data transaction processes (see serviceHooksFactory.ts implementation)
- **Shadcn/UI**: ReactJS component library with enhanced animations
- **MagicUI**: Additional UI components
- **Zod**: Frontend validation library
- **Stepperize**: Form stepper implementation

## Architecture & Data Flow

### Database Schema

```sql
-- Users table
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nip VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    home_address TEXT,
    role ENUM('SuperAdmin', 'Employee') NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Complaints table
CREATE TABLE complaints (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    reporter VARCHAR(255) NOT NULL,
    reporter_identity_type ENUM('KTP', 'SIM') NOT NULL,
    reporter_identity_number VARCHAR(16) NOT NULL,
    incident_title VARCHAR(255) NOT NULL,
    incident_description TEXT NOT NULL,
    incident_time DATETIME NOT NULL,
    reported_person VARCHAR(255),
    status ENUM('pending', 'in_progress', 'resolved', 'rejected') DEFAULT 'pending',
    assigned_to BIGINT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (assigned_to) REFERENCES users(id)
);

-- Evidence table
CREATE TABLE evidence (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    complaint_id BIGINT NOT NULL,
    title VARCHAR(255),
    file_path VARCHAR(500) NOT NULL,
    file_type ENUM('mp4', 'jpg', 'png') NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE
);
```

### Project Structure

```
app/
├── Models/
│   ├── User.php                     # User model with role enum
│   ├── Complaint.php                # Complaint model with relationships
│   └── Evidence.php                 # Evidence model for file attachments
├── Http/
│   ├── Controllers/
│   │   ├── ComplaintController.php  # Handles complaint CRUD with intents
│   │   ├── UserController.php       # User management for SuperAdmin
│   │   └── DashboardController.php  # Dashboard analytics
│   ├── Requests/
│   │   ├── Complaint/
│   │   │   ├── StoreComplaintRequest.php    # Validation for complaint creation
│   │   │   └── UpdateComplaintRequest.php   # Validation for complaint updates
│   │   └── User/
│   │       ├── StoreUserRequest.php         # Employee creation validation
│   │       └── UpdateUserRequest.php        # Employee update validation
│   └── Resources/
│       ├── ComplaintResource.php    # API response formatting
│       ├── UserResource.php         # User data formatting
│       └── EvidenceResource.php     # Evidence file formatting
├── Services/
│   ├── ComplaintService.php         # Business logic for complaints
│   ├── UserService.php              # User management business logic
│   └── FileService.php              # File upload and management
├── Repositories/
│   ├── ComplaintRepository.php      # Data access for complaints
│   ├── UserRepository.php           # Data access for users
│   └── EvidenceRepository.php       # Data access for evidence files
└── Support/
    ├── Repositories/
    │   ├── ComplaintRepositoryInterface.php
    │   ├── UserRepositoryInterface.php
    │   └── EvidenceRepositoryInterface.php
    ├── Services/
    │   ├── ComplaintServiceInterface.php
    │   ├── UserServiceInterface.php
    │   └── FileServiceInterface.php
    └── Enums/
        ├── IntentEnum.php           # Custom business logic intents
        ├── UserRoleEnum.php         # User role definitions
        └── ComplaintStatusEnum.php  # Complaint status definitions

resources/js/
├── Components/
│   ├── Forms/
│   │   ├── ComplaintStepperForm.tsx # Main stepper form component
│   │   ├── ReporterInfoStep.tsx     # Step 1: Reporter information
│   │   ├── IncidentDetailsStep.tsx  # Step 2: Incident details
│   │   ├── EvidenceUploadStep.tsx   # Step 3: Evidence upload
│   │   └── FormSuccessMessage.tsx   # Success confirmation
│   ├── Layout/
│   │   ├── GuestLayout.tsx          # Public layout
│   │   ├── AdminLayout.tsx          # Admin dashboard layout
│   │   └── NavigationMenu.tsx       # Admin navigation
│   ├── Dashboard/
│   │   ├── ComplaintStats.tsx       # Statistics widgets
│   │   ├── ComplaintTable.tsx       # Data table for complaints
│   │   └── UserManagement.tsx       # Employee management
│   └── ui/                          # Shadcn components
├── Pages/
│   ├── Index.tsx                    # Public complaint form page
│   ├── ThankYou.tsx                # Submission success page
│   └── Dashboard/
│       ├── SuperAdmin.tsx           # SuperAdmin dashboard
│       ├── Employee.tsx             # Employee dashboard
│       └── Complaints/
│           ├── Index.tsx            # Complaints list
│           └── Show.tsx             # Complaint detail view
├── Services/
│   ├── complaintServiceHook.ts      # TanStack Query hooks for complaints
│   ├── userServiceHook.ts           # TanStack Query hooks for users
│   └── evidenceServiceHook.ts       # TanStack Query hooks for evidence
└── Support/
    ├── Interfaces/
    │   ├── Models/
    │   │   ├── Complaint.ts         # Complaint type definitions
    │   │   ├── User.ts              # User type definitions
    │   │   └── Evidence.ts          # Evidence type definitions
    │   └── Resources/
    │       ├── ComplaintResource.ts # API response types
    │       ├── UserResource.ts      # User resource types
    │       └── EvidenceResource.ts  # Evidence resource types
    ├── Constants/
    │   ├── routes.ts                # Route constants
    │   ├── tanstackQueryKeys.ts     # Query key constants
    │   └── validationSchemas.ts     # Zod validation schemas
    └── Utils/
        ├── fileUtils.ts             # File handling utilities
        └── formatUtils.ts           # Data formatting utilities
```

## Intent System Implementation

### Backend Intent Handling

```php
// app/Support/Enums/IntentEnum.php
class IntentEnum
{
    const SUBMIT_PUBLIC_COMPLAINT = 'submit_public_complaint';
    const UPDATE_COMPLAINT_STATUS = 'update_complaint_status';
    const ASSIGN_COMPLAINT_TO_EMPLOYEE = 'assign_complaint_to_employee';
    const ADD_EVIDENCE_TO_COMPLAINT = 'add_evidence_to_complaint';
    const CREATE_EMPLOYEE_ACCOUNT = 'create_employee_account';
    const GENERATE_COMPLAINT_REPORT = 'generate_complaint_report';
}

// app/Http/Controllers/ComplaintController.php
public function store(StoreComplaintRequest $request)
{
    $intent = $request->get('intent', IntentEnum::SUBMIT_PUBLIC_COMPLAINT);

    switch($intent) {
        case IntentEnum::SUBMIT_PUBLIC_COMPLAINT:
            return $this->complaintService->submitPublicComplaint($request->validated());
        case IntentEnum::ADD_EVIDENCE_TO_COMPLAINT:
            return $this->complaintService->addEvidence($request->validated());
        default:
            return $this->complaintService->store($request->validated());
    }
}

public function update(UpdateComplaintRequest $request, Complaint $complaint)
{
    $intent = $request->get('intent', IntentEnum::UPDATE_COMPLAINT_STATUS);

    switch($intent) {
        case IntentEnum::UPDATE_COMPLAINT_STATUS:
            return $this->complaintService->updateStatus($complaint, $request->validated());
        case IntentEnum::ASSIGN_COMPLAINT_TO_EMPLOYEE:
            return $this->complaintService->assignToEmployee($complaint, $request->validated());
        default:
            return $this->complaintService->update($complaint, $request->validated());
    }
}
```

### Frontend Service Hook Implementation

```typescript
// resources/js/Services/complaintServiceHook.ts
export const complaintServiceHook = {
    ...serviceHooksFactory<ComplaintResource>({
        baseRoute: ROUTES.COMPLAINTS,
        baseKey: TANSTACK_QUERY_KEYS.COMPLAINTS,
    }),

    // Custom hook for public complaint submission
    useSubmitPublicComplaint: () => {
        return createMutation({
            mutationFn: async (params: ComplaintFormData) => {
                return mutationApi({
                    method: 'post',
                    url: route(`${ROUTES.COMPLAINTS}.store`),
                    data: params,
                    params: { intent: IntentEnum.SUBMIT_PUBLIC_COMPLAINT },
                });
            },
            invalidateQueryKeys: [{ queryKey: [TANSTACK_QUERY_KEYS.COMPLAINTS], exact: false }],
        });
    },

    // Custom hook for status updates
    useUpdateStatus: () => {
        return createMutation({
            mutationFn: async ({ id, status }: { id: number; status: string }) => {
                return mutationApi({
                    method: 'put',
                    url: route(`${ROUTES.COMPLAINTS}.update`, id),
                    data: { status },
                    params: { intent: IntentEnum.UPDATE_COMPLAINT_STATUS },
                });
            },
            invalidateQueryKeys: [{ queryKey: [TANSTACK_QUERY_KEYS.COMPLAINTS], exact: false }],
        });
    },

    // Custom hook for assignment
    useAssignToEmployee: () => {
        return createMutation({
            mutationFn: async ({ id, employeeId }: { id: number; employeeId: number }) => {
                return mutationApi({
                    method: 'put',
                    url: route(`${ROUTES.COMPLAINTS}.update`, id),
                    data: { assigned_to: employeeId },
                    params: { intent: IntentEnum.ASSIGN_COMPLAINT_TO_EMPLOYEE },
                });
            },
            invalidateQueryKeys: [{ queryKey: [TANSTACK_QUERY_KEYS.COMPLAINTS], exact: false }],
        });
    },
};
```

## Stepper Form Implementation

### Main Stepper Component

```typescript
// resources/js/Components/Forms/ComplaintStepperForm.tsx
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { complaintValidationSchema } from '@/Support/Constants/validationSchemas';

const steps = [
  {
    id: 'reporter-info',
    title: 'Informasi Pelapor',
    description: 'Data diri pelapor pengaduan',
    component: ReporterInfoStep,
  },
  {
    id: 'incident-details',
    title: 'Detail Kejadian',
    description: 'Rincian kejadian yang dilaporkan',
    component: IncidentDetailsStep,
  },
  {
    id: 'evidence-upload',
    title: 'Bukti Pendukung',
    description: 'Upload file pendukung (opsional)',
    component: EvidenceUploadStep,
  },
];

export default function ComplaintStepperForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const submitComplaint = complaintServiceHook.useSubmitPublicComplaint();

  const form = useForm<z.infer<typeof complaintValidationSchema>>({
    resolver: zodResolver(complaintValidationSchema),
    defaultValues: {
      reporter: '',
      reporter_identity_type: 'KTP',
      reporter_identity_number: '',
      incident_title: '',
      incident_description: '',
      incident_time: new Date(),
      reported_person: '',
      evidence_files: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof complaintValidationSchema>) => {
    try {
      await submitComplaint.mutateAsync(data);
      // Redirect to success page
      window.location.href = route('complaints.thank-you');
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Stepper Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${
                index <= currentStep ? 'text-rri-blue' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  index <= currentStep
                    ? 'bg-rri-blue text-white border-rri-blue'
                    : 'bg-white text-gray-400 border-gray-300'
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-24 h-0.5 ${
                    index < currentStep ? 'bg-rri-blue' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">{steps[currentStep].title}</h2>
          <p className="text-gray-600">{steps[currentStep].description}</p>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CurrentStepComponent form={form} />

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            data-testid="stepper-prev-btn"
            className="px-6 py-2 border border-gray-300 rounded-md disabled:opacity-50"
          >
            Sebelumnya
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              type="submit"
              data-testid="submit-complaint-btn"
              disabled={submitComplaint.isPending}
              className="px-6 py-2 bg-rri-blue text-white rounded-md hover:bg-rri-light-blue disabled:opacity-50"
            >
              {submitComplaint.isPending ? 'Mengirim...' : 'Kirim Pengaduan'}
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              data-testid="stepper-next-btn"
              className="px-6 py-2 bg-rri-blue text-white rounded-md hover:bg-rri-light-blue"
            >
              Selanjutnya
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
```

## Validation Schemas

### Zod Validation (Frontend)

```typescript
// resources/js/Support/Constants/validationSchemas.ts
import { z } from 'zod';

export const complaintValidationSchema = z.object({
    reporter: z.string().min(2, 'Nama pelapor minimal 2 karakter').max(255, 'Nama pelapor maksimal 255 karakter'),

    reporter_identity_type: z.enum(['KTP', 'SIM'], {
        required_error: 'Pilih jenis identitas',
    }),

    reporter_identity_number: z.string().regex(/^\d{16}$/, 'Nomor identitas harus 16 digit angka'),

    incident_title: z.string().min(5, 'Judul kejadian minimal 5 karakter').max(255, 'Judul kejadian maksimal 255 karakter'),

    incident_description: z.string().min(20, 'Deskripsi kejadian minimal 20 karakter').max(1000, 'Deskripsi kejadian maksimal 1000 karakter'),

    incident_time: z
        .date({
            required_error: 'Waktu kejadian harus diisi',
        })
        .max(new Date(), 'Waktu kejadian tidak boleh di masa depan'),

    reported_person: z.string().max(255, 'Nama terlapor maksimal 255 karakter').optional().or(z.literal('')),

    evidence_files: z.array(z.instanceof(File)).max(5, 'Maksimal 5 file bukti').optional(),
});

export type ComplaintFormData = z.infer<typeof complaintValidationSchema>;
```

### Laravel Validation (Backend)

```php
// app/Http/Requests/Complaint/StoreComplaintRequest.php
class StoreComplaintRequest extends FormRequest
{
    public function rules(): array
    {
        $rules = [
            'reporter' => ['required', 'string', 'min:2', 'max:255'],
            'reporter_identity_type' => ['required', 'in:KTP,SIM'],
            'reporter_identity_number' => ['required', 'regex:/^\d{16}$/'],
            'incident_title' => ['required', 'string', 'min:5', 'max:255'],
            'incident_description' => ['required', 'string', 'min:20', 'max:1000'],
            'incident_time' => ['required', 'date', 'before_or_equal:now'],
            'reported_person' => ['nullable', 'string', 'max:255'],
            'evidence_files' => ['nullable', 'array', 'max:5'],
            'evidence_files.*' => ['file', 'mimes:jpg,jpeg,png,mp4', 'max:10240'], // 10MB max
        ];

        $intent = $this->get('intent');

        if ($intent === IntentEnum::SUBMIT_PUBLIC_COMPLAINT) {
            // Additional validation for public submissions
            $rules['reporter_identity_number'] = [
                'required',
                'regex:/^\d{16}$/',
                'unique:complaints,reporter_identity_number'
            ];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'reporter.required' => 'Nama pelapor harus diisi',
            'reporter.min' => 'Nama pelapor minimal 2 karakter',
            'reporter_identity_number.regex' => 'Nomor identitas harus 16 digit angka',
            'reporter_identity_number.unique' => 'Nomor identitas sudah pernah digunakan untuk pengaduan',
            'incident_title.min' => 'Judul kejadian minimal 5 karakter',
            'incident_description.min' => 'Deskripsi kejadian minimal 20 karakter',
            'incident_time.before_or_equal' => 'Waktu kejadian tidak boleh di masa depan',
            'evidence_files.max' => 'Maksimal 5 file bukti dapat diunggah',
            'evidence_files.*.mimes' => 'File harus berformat JPG, PNG, atau MP4',
            'evidence_files.*.max' => 'Ukuran file maksimal 10MB',
        ];
    }
}
```

## File Storage Implementation

### File Service

```php
// app/Services/FileService.php
class FileService implements FileServiceInterface
{
    public function uploadEvidenceFiles(array $files, int $complaintId): array
    {
        $uploadedFiles = [];

        foreach ($files as $file) {
            $filename = $this->generateSecureFilename($file);
            $path = Storage::disk('public')->put('evidence', $file, $filename);

            $evidence = Evidence::create([
                'complaint_id' => $complaintId,
                'title' => $file->getClientOriginalName(),
                'file_path' => $path,
                'file_type' => $this->getFileType($file->getClientOriginalExtension()),
            ]);

            $uploadedFiles[] = $evidence;
        }

        return $uploadedFiles;
    }

    private function generateSecureFilename(UploadedFile $file): string
    {
        return time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
    }

    private function getFileType(string $extension): string
    {
        return match(strtolower($extension)) {
            'jpg', 'jpeg', 'png' => strtolower($extension),
            'mp4' => 'mp4',
            default => 'unknown'
        };
    }
}
```

## RRI Branding & Content

### Design System

```css
/* resources/css/app.css */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

@layer base {
    :root {
        /* RRI Primary Colors */
        --rri-blue: #1e40af;
        --rri-red: #dc2626;
        --rri-navy: #1e293b;

        /* RRI Secondary Colors */
        --rri-light-blue: #3b82f6;
        --rri-gold: #f59e0b;

        /* Neutral Palette */
        --rri-gray-50: #f8fafc;
        --rri-gray-100: #f1f5f9;
        --rri-gray-200: #e2e8f0;
        --rri-gray-300: #cbd5e1;
        --rri-gray-400: #94a3b8;
        --rri-gray-500: #64748b;
        --rri-gray-600: #475569;
        --rri-gray-700: #334155;
        --rri-gray-800: #1e293b;
        --rri-gray-900: #0f172a;
    }
}

@layer components {
    .btn-rri-primary {
        @apply bg-rri-blue hover:bg-rri-light-blue rounded-md px-4 py-2 font-medium text-white transition-colors;
    }

    .btn-rri-secondary {
        @apply bg-rri-gray-100 hover:bg-rri-gray-200 text-rri-gray-800 rounded-md px-4 py-2 font-medium transition-colors;
    }

    .card-rri {
        @apply border-rri-gray-200 rounded-lg border bg-white p-6 shadow-sm;
    }
}
```

### Content Constants

```typescript
// resources/js/Support/Constants/contentConstants.ts
export const RRI_CONTENT = {
    organization: {
        fullName: 'Lembaga Penyiaran Publik Radio Republik Indonesia',
        shortName: 'RRI',
        tagline: 'Sekali Di Udara Tetap Di Udara',
        mission: 'Menyajikan program siaran yang mendidik, menghibur, dan mencerahkan',
    },

    pontianakOffice: {
        name: 'RRI Pontianak',
        address: 'Jl. Ahmad Yani No. 1, Pontianak Kota, Kalimantan Barat 78124',
        phone: '+62 561 732 123',
        email: 'pontianak@rri.co.id',
        coordinates: {
            lat: -0.0263,
            lng: 109.3425,
        },
        operationalHours: {
            weekdays: '08:00 - 16:00 WIB',
            weekend: 'Tutup',
        },
    },

    complaintCategories: [
        {
            id: 'content',
            name: 'Konten Siaran',
            description: 'Keluhan terkait isi siaran radio',
            subcategories: ['Kualitas audio/suara', 'Konten tidak sesuai', 'Bahasa tidak pantas', 'Informasi tidak akurat'],
        },
        {
            id: 'service',
            name: 'Pelayanan',
            description: 'Keluhan terkait pelayanan publik',
            subcategories: ['Respon customer service', 'Akses informasi', 'Transparansi', 'Keterlambatan siaran'],
        },
        {
            id: 'facility',
            name: 'Fasilitas',
            description: 'Keluhan terkait fasilitas dan teknologi',
            subcategories: ['Gangguan sinyal', 'Website/aplikasi', 'Fasilitas kantor', 'Akses difabel'],
        },
        {
            id: 'hr',
            name: 'Sumber Daya Manusia',
            description: 'Keluhan terkait pegawai RRI',
            subcategories: ['Perilaku pegawai', 'Profesionalisme', 'Etika penyiaran', 'Diskriminasi'],
        },
    ],

    legalBasis: {
        mainRegulation: 'Peraturan Direktur Utama RRI No. 06 Tahun 2023',
        supportingLaws: [
            'UU No. 32 Tahun 2002 tentang Penyiaran',
            'UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik',
            'UU No. 25 Tahun 2009 tentang Pelayanan Publik',
        ],
    },
};
```

## Development Rules & Best Practices

### Core Development Rules

1. **File Storage**: Always use `Storage::disk('public')->put()` for file uploads
2. **Be Opinionated**: Use latest and stable approaches
3. **Creativity**: Welcome creative solutions but avoid hallucination, stay within context
4. **Frontend Validation**: Use Zod for all form validation instead of react-hook-form validation
5. **Error Explanation**: Explain errors logically for deeper understanding
6. **Intent System**: Use IntentEnum.php for custom business logic, add conditions in FormRequests
7. **Code Quality**: Keep code clean, modular, and generalized but not over-coupled
8. **Comments**: Don't delete developer comments like `// TODO:`, `// BUG:`
9. **Breaking Changes**: Ask before implementing breaking changes
10. **Additive Changes**: Only add code, don't remove existing code
11. **Communication**: Ask questions rather than making reckless changes
12. **Code Preservation**: Don't replace code with placeholder comments
13. **Scope**: Don't modify unrelated code
14. **Docker Commands**: Use `./dc.sh` for Docker commands to avoid EACCESS errors
15. **Consistency**: Follow existing code patterns for frontend development
16. **Testing**: Don't run Laravel tests (they reset the database)
17. **Stuck Processes**: Avoid commands that cause generation to get stuck

### Frontend Development Guidelines

1. **Route References**: Use `route(\`\${ROUTES.RESOURCE}.action\`)` format instead of direct Laravel route calls
2. **Component Structure**: Follow existing component patterns
3. **Type Safety**: Maintain strict TypeScript typing
4. **State Management**: Use TanStack Query for server state, React hooks for local state
5. **Form Handling**: Combine React Hook Form with Zod validation
6. **UI Components**: Prefer Shadcn/UI components with MagicUI enhancements
7. **Testing Selectors**: Use `data-testid` attributes for E2E testing

### Backend Development Guidelines

1. **Service Repository Pattern**: Always use the repository-service pattern
2. **Intent System**: Route custom business logic through intents
3. **Validation**: Implement validation in both FormRequests and services
4. **File Security**: Validate file types, sizes, and scan for security issues
5. **Database**: Use proper indexing and relationships
6. **Error Handling**: Implement comprehensive error handling and logging
7. **Security**: Follow Laravel security best practices

### Testing Requirements

1. **E2E Testing**: Focus on user workflows and critical paths
2. **Direct Element Selection**: Prefer direct element selection over complex selectors
3. **Data Selectors**: Define `data-testid` attributes for testable elements
4. **Clean Code**: Maintain clean and readable test code
5. **Flow Analysis**: Analyze existing codebase patterns before implementing

### Test Selectors

```typescript
// resources/js/Support/Constants/testSelectors.ts
export const TEST_SELECTORS = {
    // Complaint Form
    complaintForm: 'complaint-form',
    stepperNextBtn: 'stepper-next-btn',
    stepperPrevBtn: 'stepper-prev-btn',
    submitComplaintBtn: 'submit-complaint-btn',

    // File Upload
    evidenceUpload: 'evidence-upload',
    fileDropzone: 'file-dropzone',

    // Admin Interface
    complaintsTable: 'complaints-table',
    statusSelect: 'status-select',
    assigneeSelect: 'assignee-select',
    complaintDetailModal: 'complaint-detail-modal',

    // User Management
    createEmployeeBtn: 'create-employee-btn',
    employeeForm: 'employee-form',
    employeeTable: 'employee-table',

    // Navigation
    adminSidebar: 'admin-sidebar',
    userMenu: 'user-menu',
    logoutBtn: 'logout-btn',
} as const;
```

## Security & Performance Considerations

### File Upload Security

```php
// app/Rules/SecureFileUpload.php
class SecureFileUpload implements Rule
{
    private array $allowedMimes = ['image/jpeg', 'image/png', 'video/mp4'];
    private int $maxSize = 10485760; // 10MB

    public function passes($attribute, $value): bool
    {
        if (!$value instanceof UploadedFile) {
            return false;
        }

        // Check file size
        if ($value->getSize() > $this->maxSize) {
            return false;
        }

        // Check MIME type
        if (!in_array($value->getMimeType(), $this->allowedMimes)) {
            return false;
        }

        // Check file extension
        $extension = strtolower($value->getClientOriginalExtension());
        if (!in_array($extension, ['jpg', 'jpeg', 'png', 'mp4'])) {
            return false;
        }

        // Additional security checks can be added here
        return true;
    }

    public function message(): string
    {
        return 'File harus berformat JPG, PNG, atau MP4 dengan ukuran maksimal 10MB.';
    }
}
```

### Performance Optimization

```typescript
// resources/js/hooks/useOptimizedQuery.ts
import { useQuery } from '@tanstack/react-query';

export function useOptimizedComplaintsList(filters: ComplaintFilters) {
    return useQuery({
        queryKey: ['complaints', 'list', filters],
        queryFn: () => complaintServiceHook.getAll(filters),
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });
}
```

---

**Important Notes:**

- This project follows Indonesian government regulations for public service complaints
- Maintain compliance with transparency and accountability standards
- All code must follow the existing architectural patterns
- Security and data protection are paramount for government applications
- Regular testing and quality assurance is required for public-facing systems
