import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Upload, FileText, Image, Video, File, Music } from 'lucide-react';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
    value?: File[];
    onChange?: (files: File[]) => void;
    maxFiles?: number;
    acceptedTypes?: string[];
    maxSize?: number;
    disabled?: boolean;
}

export function FileUpload({
    value = [],
    onChange,
    maxFiles = 5,
    acceptedTypes = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
        'video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/webm',
        'audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/flac', 'audio/aac', 'audio/ogg',
        'application/pdf',
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    maxSize = 100 * 1024 * 1024, // 100MB
    disabled = false,
}: FileUploadProps) {
    const [files, setFiles] = useState<File[]>(value);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
        setFiles(newFiles);
        onChange?.(newFiles);
    }, [files, maxFiles, onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: acceptedTypes.reduce((acc, type) => {
            acc[type] = [];
            return acc;
        }, {} as Record<string, string[]>),
        maxSize,
        disabled,
        multiple: true,
    });

    const removeFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        onChange?.(newFiles);
    };

    const getFileIcon = (fileType: string) => {
        if (fileType.startsWith('image/')) return <Image className="h-4 w-4" />;
        if (fileType.startsWith('video/')) return <Video className="h-4 w-4" />;
        if (fileType.startsWith('audio/')) return <Music className="h-4 w-4" />;
        if (fileType === 'application/pdf') return <FileText className="h-4 w-4" />;
        return <File className="h-4 w-4" />;
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Evidence Files
                </CardTitle>
                <CardDescription>
                    Upload supporting evidence files (optional). Maximum {maxFiles} files, 100MB each.
                    <br />
                    <strong>File yang didukung:</strong> .jpg, .png, .gif, .webp, .mp4, .avi, .mov, .wmv, .webm, .mp3, .wav, .flac, .aac, .ogg, .pdf, .doc, .docx
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Dropzone */}
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                        isDragActive
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-300 hover:border-gray-400'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <input {...getInputProps()} />
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    {isDragActive ? (
                        <p className="text-sm text-gray-600">Drop the files here...</p>
                    ) : (
                        <div>
                            <p className="text-sm text-gray-600 mb-2">
                                Drag and drop files here, or click to select files
                            </p>
                            <p className="text-xs text-gray-500">
                                Maksimal 100MB per file. Format: JPG, PNG, GIF, WEBP, MP4, AVI, MOV, WMV, WEBM, MP3, WAV, FLAC, AAC, OGG, PDF, DOC, DOCX
                            </p>
                        </div>
                    )}
                </div>

                {/* File List */}
                {files.length > 0 && (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Selected Files ({files.length}/{maxFiles})</Label>
                        <div className="space-y-2">
                            {files.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        {getFileIcon(file.type)}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{file.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {formatFileSize(file.size)}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFile(index)}
                                        className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* File limit warning */}
                {files.length >= maxFiles && (
                    <p className="text-sm text-amber-600">
                        Maximum number of files reached ({maxFiles}).
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
