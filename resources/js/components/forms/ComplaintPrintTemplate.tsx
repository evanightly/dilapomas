import { ComplaintFormData } from '@/support/constants/validationSchemas';
import { forwardRef } from 'react';

interface ComplaintPrintTemplateProps {
    complaintNumber: string;
    formData: ComplaintFormData;
    files: File[];
}

export const ComplaintPrintTemplate = forwardRef<HTMLDivElement, ComplaintPrintTemplateProps>(({ complaintNumber, formData, files }, ref) => {
    const phoneNumber = formData.reporter_phone_number ? `+62${formData.reporter_phone_number}` : 'Tidak tersedia';

    return (
        <div
            ref={ref}
            className='print-template'
            style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px', lineHeight: '1.6' }}
        >
            <style>{`
                    @media print {
                        .print-template {
                            font-family: Arial, sans-serif !important;
                            max-width: 800px !important;
                            margin: 0 auto !important;
                            padding: 20px !important;
                            line-height: 1.6 !important;
                            color: #000 !important;
                        }
                        
                        .print-header {
                            text-align: center !important;
                            border-bottom: 2px solid #333 !important;
                            padding-bottom: 20px !important;
                            margin-bottom: 30px !important;
                        }
                        
                        .print-header h1 {
                            color: #1e40af !important;
                            margin-bottom: 5px !important;
                        }
                        
                        .print-complaint-number {
                            background: #f3f4f6 !important;
                            padding: 15px !important;
                            border: 2px solid #1e40af !important;
                            border-radius: 8px !important;
                            text-align: center !important;
                            margin-bottom: 30px !important;
                        }
                        
                        .print-complaint-number h2 {
                            margin: 0 !important;
                            color: #1e40af !important;
                            font-size: 24px !important;
                        }
                        
                        .print-section {
                            margin-bottom: 25px !important;
                            border: 1px solid #e5e7eb !important;
                            padding: 20px !important;
                            border-radius: 8px !important;
                        }
                        
                        .print-section h3 {
                            color: #374151 !important;
                            border-bottom: 1px solid #e5e7eb !important;
                            padding-bottom: 10px !important;
                            margin-top: 0 !important;
                            margin-bottom: 20px !important;
                        }
                        
                        .print-info-table {
                            width: 100% !important;
                            border-collapse: collapse !important;
                            margin-bottom: 10px !important;
                        }
                        
                        .print-info-table td {
                            padding: 8px 0 !important;
                            vertical-align: top !important;
                        }
                        
                        .print-field-label {
                            font-weight: bold !important;
                            color: #4b5563 !important;
                            width: 200px !important;
                            padding-right: 10px !important;
                        }
                        
                        .print-field-colon {
                            color: #4b5563 !important;
                            width: 10px !important;
                            text-align: center !important;
                        }
                        
                        .print-field-value {
                            color: #111827 !important;
                            word-wrap: break-word !important;
                            padding-left: 10px !important;
                        }
                        
                        .print-description {
                            white-space: pre-wrap !important;
                            background: #f9fafb !important;
                            padding: 15px !important;
                            border-radius: 4px !important;
                            border-left: 4px solid #1e40af !important;
                        }
                        
                        .print-evidence-file {
                            border: 1px solid #e5e7eb !important;
                            border-radius: 6px !important;
                            padding: 12px !important;
                            margin-bottom: 10px !important;
                            background: #f9fafb !important;
                        }
                        
                        .print-file-header {
                            display: flex !important;
                            justify-content: space-between !important;
                            align-items: center !important;
                            margin-bottom: 8px !important;
                        }
                        
                        .print-file-extension {
                            background: #1e40af !important;
                            color: white !important;
                            padding: 2px 8px !important;
                            border-radius: 4px !important;
                            font-size: 12px !important;
                            font-weight: bold !important;
                        }
                        
                        .print-footer {
                            margin-top: 40px !important;
                            text-align: center !important;
                            color: #6b7280 !important;
                            border-top: 1px solid #e5e7eb !important;
                            padding-top: 20px !important;
                        }
                    }
                `}</style>

            <div className='print-header'>
                <h1>DILAPOMAS - RRI PONTIANAK</h1>
                <p>Sistem Pengaduan Masyarakat</p>
                <p>Radio Republik Indonesia Pontianak</p>
            </div>

            <div className='print-complaint-number'>
                <h2>NOMOR PENGADUAN: {complaintNumber}</h2>
                <p>
                    Tanggal:{' '}
                    {new Date().toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
            </div>

            <div className='print-section'>
                <h3>Informasi Pelapor</h3>
                <table className='print-info-table'>
                    <tbody>
                        <tr>
                            <td className='print-field-label'>Nama Lengkap</td>
                            <td className='print-field-colon'>:</td>
                            <td className='print-field-value'>{formData.reporter || 'Tidak tersedia'}</td>
                        </tr>
                        <tr>
                            <td className='print-field-label'>Email</td>
                            <td className='print-field-colon'>:</td>
                            <td className='print-field-value'>{formData.reporter_email || 'Tidak tersedia'}</td>
                        </tr>
                        <tr>
                            <td className='print-field-label'>Nomor Telepon</td>
                            <td className='print-field-colon'>:</td>
                            <td className='print-field-value'>{phoneNumber}</td>
                        </tr>
                        <tr>
                            <td className='print-field-label'>Jenis Identitas</td>
                            <td className='print-field-colon'>:</td>
                            <td className='print-field-value'>{formData.reporter_identity_type || 'KTP'}</td>
                        </tr>
                        <tr>
                            <td className='print-field-label'>Nomor Identitas</td>
                            <td className='print-field-colon'>:</td>
                            <td className='print-field-value'>{formData.reporter_identity_number || 'Tidak tersedia'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className='print-section'>
                <h3>Informasi Kejadian</h3>
                <table className='print-info-table'>
                    <tbody>
                        <tr>
                            <td className='print-field-label'>Judul Kejadian</td>
                            <td className='print-field-colon'>:</td>
                            <td className='print-field-value'>{formData.incident_title || 'Tidak tersedia'}</td>
                        </tr>
                        <tr>
                            <td className='print-field-label'>Waktu Kejadian</td>
                            <td className='print-field-colon'>:</td>
                            <td className='print-field-value'>
                                {formData.incident_time
                                    ? new Date(formData.incident_time).toLocaleDateString('id-ID', {
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric',
                                      })
                                    : 'Tidak tersedia'}
                            </td>
                        </tr>
                        <tr>
                            <td className='print-field-label'>Nama Terlapor</td>
                            <td className='print-field-colon'>:</td>
                            <td className='print-field-value'>{formData.reported_person || 'Tidak tersedia'}</td>
                        </tr>
                        <tr>
                            <td className='print-field-label'>Deskripsi Kejadian</td>
                            <td className='print-field-colon'>:</td>
                            <td className='print-field-value'>
                                <div className='print-description'>{formData.incident_description || 'Tidak tersedia'}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {files && files.length > 0 && (
                <div className='print-section'>
                    <h3>Bukti Pendukung</h3>
                    <p>Jumlah file yang dilampirkan: {files.length} file</p>
                    <table className='print-info-table' style={{ marginTop: '15px' }}>
                        <tbody>
                            {files.map((file, index) => {
                                const fileExtension = file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN';
                                const fileSizeMB = file.size / 1024 / 1024;
                                const fileSizeKB = file.size / 1024;
                                const displaySize = fileSizeMB >= 1 ? fileSizeMB.toFixed(2) + ' MB' : fileSizeKB.toFixed(2) + ' KB';

                                return (
                                    <tr key={index}>
                                        <td className='print-field-label'>File {index + 1}</td>
                                        <td className='print-field-colon'>:</td>
                                        <td className='print-field-value'>
                                            <div className='print-evidence-file' style={{ margin: '0', padding: '10px', borderRadius: '4px' }}>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        marginBottom: '8px',
                                                    }}
                                                >
                                                    <span style={{ fontWeight: 'bold', color: '#374151' }}>{file.name}</span>
                                                    <span className='print-file-extension'>{fileExtension}</span>
                                                </div>
                                                <div style={{ fontSize: '14px' }}>
                                                    <div style={{ marginBottom: '4px' }}>
                                                        <span style={{ color: '#6b7280', fontWeight: '500' }}>Ukuran: </span>
                                                        <span style={{ color: '#111827' }}>{displaySize}</span>
                                                    </div>
                                                    <div>
                                                        <span style={{ color: '#6b7280', fontWeight: '500' }}>Tipe: </span>
                                                        <span style={{ color: '#111827' }}>{file.type || 'Tidak diketahui'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            <div className='print-footer'>
                <p>
                    <strong>PENTING:</strong> Simpan nomor pengaduan ini sebagai referensi untuk menindaklanjuti laporan Anda.
                </p>
                <p>
                    Untuk informasi lebih lanjut, hubungi: <strong>0811 5701 042</strong> atau <strong>laporrripontianak@gmail.com</strong>
                </p>
                <p>
                    <em>
                        Dokumen ini dicetak pada {new Date().toLocaleDateString('id-ID')} pukul {new Date().toLocaleTimeString('id-ID')}
                    </em>
                </p>
            </div>
        </div>
    );
});

ComplaintPrintTemplate.displayName = 'ComplaintPrintTemplate';
