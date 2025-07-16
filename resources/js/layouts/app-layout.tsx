import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    hasPadding?: boolean;
    className?: string;
}

export default ({ children, breadcrumbs, hasPadding = true, className, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <div className={cn('min-h-full', hasPadding && 'p-4', className)}>{children}</div>
    </AppLayoutTemplate>
);
