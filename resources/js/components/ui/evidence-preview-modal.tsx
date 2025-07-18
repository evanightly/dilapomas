import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, AlertTriangle } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { ComplaintEvidenceResource } from '@/support/interfaces/resources';
import HeroVideoDialog from './hero-video-dialog';
import { DialogDescription } from '@radix-ui/react-dialog';

interface EvidencePreviewModalProps {
    children: ReactNode;
    evidence: ComplaintEvidenceResource;
    onDownload: () => void;
}

export function EvidencePreviewModal({ children, evidence, onDownload }: EvidencePreviewModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    const isImageFile = (fileType: string) => {
        return fileType?.startsWith('image/');
    };

    const isVideoFile = (fileType: string) => {
        return fileType?.startsWith('video/');
    };

    const isPdfFile = (fileType: string) => {
        return fileType === 'application/pdf';
    };

    const isDocumentFile = (fileType: string) => {
        return fileType?.includes('msword') || fileType?.includes('document');
    };

    const renderPreview = () => {
        const fileType = evidence.file_type;

        if (isImageFile(fileType)) {
            return (
                <div className="flex items-center justify-center">
                    <img 
                        src={evidence.file} 
                        alt={evidence.title}
                        className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
                    />
                </div>
            );
        }

        if (isVideoFile(fileType)) {
            return (
                <div className="flex items-center justify-center">
                    <video 
                        controls 
                        className="max-w-full max-h-[70vh] rounded-lg shadow-lg"
                        preload="metadata"
                    >
                        <source src={evidence.file} type={fileType} />
                        Your browser does not support the video tag.
                    </video>
                </div>
            );
        }

        if (isPdfFile(fileType)) {
            return (
                <div className="p-4 space-y-4">
                    <Alert variant='warning-outline'>
                        <AlertTriangle className="h-4 w-4 fill-warning" />
                        <AlertDescription>
                            <strong>Penting:</strong> Jika PDF tidak tampil dengan benar, silakan disable extension Internet Download Manager (IDM) pada browser Anda terlebih dahulu.
                        </AlertDescription>
                    </Alert>
                    <div className="border rounded-lg overflow-hidden">
                        <iframe
                            src={evidence.file}
                            className="w-full h-[70vh]"
                            title={evidence.title}
                        />
                    </div>
                </div>
            );
        }

        if (isDocumentFile(fileType)) {
            return (
                <div className="flex items-center justify-center p-8">
                    <div className="text-center space-y-4">
                        <div className="text-gray-500">
                            <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4 18h12V6l-4-4H4v16zm8-14l2 2h-2V4z"/>
                            </svg>
                            <p className="text-lg font-medium">Document Preview</p>
                            <p className="text-sm text-gray-600">
                                {evidence.title}
                            </p>
                        </div>
                        <Button onClick={onDownload} className="mt-4">
                            <Download className="h-4 w-4 mr-2" />
                            Download Document
                        </Button>
                    </div>
                </div>
            );
        }

        // Fallback for other file types
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center space-y-4">
                    <div className="text-gray-500">
                        <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 18h12V6l-4-4H4v16zm8-14l2 2h-2V4z"/>
                        </svg>
                        <p className="text-lg font-medium">File Preview</p>
                        <p className="text-sm text-gray-600">
                            {evidence.title}
                        </p>
                    </div>
                    <Button onClick={onDownload} className="mt-4">
                        <Download className="h-4 w-4 mr-2" />
                        Download File
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="min-w-6xl max-h-[90vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <span className="text-wrap">{evidence.title}</span>
                        <div className="flex items-center gap-2 ml-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onDownload}
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Download
                            </Button>
                        </div>
                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                    {renderPreview()}
            </DialogContent>
        </Dialog>
    );
}
