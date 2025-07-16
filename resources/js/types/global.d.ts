import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { AxiosInstance } from 'axios';
import type { route as routeFn } from 'ziggy-js';
import { PageProps as AppPageProps } from './';
declare global {
    interface Window {
        axios: AxiosInstance;
    }
    const axios: AxiosInstance;
    const route: typeof routeFn;
}

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}
