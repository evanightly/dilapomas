import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ComplaintEvidenceResource } from '@/support/interfaces/resources';
import { Download, FileText, Image, Video, File, ZoomIn, Play, FileImage } from 'lucide-react';
import { EvidencePreviewModal } from './evidence-preview-modal';

interface ExistingEvidenceListProps {
    evidences: ComplaintEvidenceResource[];
}

export function ExistingEvidenceList({ evidences }: ExistingEvidenceListProps) {
    if (!evidences || evidences.length === 0) {
        return null;
    }

    const getFileIcon = (fileType: string) => {
        if (fileType.startsWith('image/')) return <Image className="h-4 w-4" />;
        if (fileType.startsWith('video/')) return <Video className="h-4 w-4" />;
        if (fileType === 'application/pdf') return <FileText className="h-4 w-4" />;
        return <File className="h-4 w-4" />;
    };

    const getFileTypeColor = (fileType: string) => {
        if (fileType.startsWith('image/')) return 'bg-green-100 text-green-800';
        if (fileType.startsWith('video/')) return 'bg-blue-100 text-blue-800';
        if (fileType === 'application/pdf') return 'bg-red-100 text-red-800';
        return 'bg-gray-100 text-gray-800';
    };

    const isImageFile = (fileType: string) => {
        return fileType?.startsWith('image/');
    };

    const isVideoFile = (fileType: string) => {
        return fileType?.startsWith('video/');
    };

    const isPdfFile = (fileType: string) => {
        return fileType === 'application/pdf';
    };

    const renderPreviewThumbnail = (evidence: ComplaintEvidenceResource) => {
        const fileType = evidence.file_type;

        if (isImageFile(fileType)) {
            return (
                <div className="relative group cursor-pointer">
                    <img 
                        src={evidence.file} 
                        alt={evidence.title}
                        className="w-12 h-12 object-cover rounded-lg border"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg transition-all duration-200 flex items-center justify-center">
                        <ZoomIn className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                </div>
            );
        }

        if (isVideoFile(fileType)) {
            return (
                <div className="relative group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Play className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-200 flex items-center justify-center">
                        <ZoomIn className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                </div>
            );
        }

        if (isPdfFile(fileType)) {
            return (
                <div className="relative group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-200 flex items-center justify-center">
                        <ZoomIn className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                </div>
            );
        }

        // Default file icon
        return (
            <div className="relative group cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
                    <File className="h-6 w-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-200 flex items-center justify-center">
                    <ZoomIn className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
            </div>
        );
    };

    const handleDownload = (evidence: ComplaintEvidenceResource) => {
        const link = document.createElement('a');
        link.href = `/${evidence.file_path}`;
        link.download = evidence.title;
        link.click();
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Existing Evidence Files
                </CardTitle>
                <CardDescription>
                    Files that were previously uploaded with this complaint
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {evidences.map((evidence) => (
                        <div
                            key={evidence.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                <EvidencePreviewModal
                                    evidence={evidence}
                                    onDownload={() => handleDownload(evidence)}
                                >
                                    {renderPreviewThumbnail(evidence)}
                                </EvidencePreviewModal>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{evidence.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge 
                                            variant="secondary" 
                                            className={`text-xs ${getFileTypeColor(evidence.file_type)}`}
                                        >
                                            {evidence.file_type.split('/')[1]?.toUpperCase()}
                                        </Badge>
                                        <span className="text-xs text-gray-500">
                                            {evidence.created_at ? new Date(evidence.created_at).toLocaleDateString() : 'Unknown date'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDownload(evidence)}
                                className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                            >
                                <Download className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
