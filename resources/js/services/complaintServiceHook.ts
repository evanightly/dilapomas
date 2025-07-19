import { createMutation } from '@/helpers';
import { mutationApi } from '@/helpers/';
import { serviceHooksFactory } from '@/services/serviceHooksFactory';
import { ROUTES } from '@/support/constants/routes';
import { TANSTACK_QUERY_KEYS } from '@/support/constants/tanstackQueryKeys';
import { IntentEnum } from '@/support/enums/intentEnum';
import { ComplaintResource } from '@/support/interfaces/resources';

/**
 * Convert data to FormData if files are present
 */
const convertToFormData = (data: any) => {
    const hasFiles = data.evidence_files && data.evidence_files.length > 0;

    if (!hasFiles) {
        return data;
    }

    const formData = new FormData();

    // Add all fields to FormData
    Object.entries(data).forEach(([key, value]) => {
        if (key === 'evidence_files' && Array.isArray(value)) {
            // Handle file array
            value.forEach((file: File) => {
                formData.append('evidence_files[]', file);
            });
        } else if (value !== null && value !== undefined) {
            formData.append(key, value as string);
        }
    });

    return formData;
};

export const complaintServiceHook = {
    ...serviceHooksFactory<ComplaintResource>({
        baseRoute: ROUTES.COMPLAINTS,
        baseKey: TANSTACK_QUERY_KEYS.COMPLAINTS,
    }),

    // Override useCreate to handle FormData
    useCreate: () => {
        return createMutation({
            mutationFn: async (params: { data: any }) => {
                const formData = convertToFormData(params.data);
                return mutationApi({
                    method: 'post',
                    url: route(`${ROUTES.COMPLAINTS}.store`),
                    data: formData,
                    requestConfig: {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                });
            },
            invalidateQueryKeys: [{ queryKey: [TANSTACK_QUERY_KEYS.COMPLAINTS], exact: false }],
        });
    },

    // Override useUpdate to handle FormData
    useUpdate: () => {
        return createMutation({
            mutationFn: async (params: { id: number; data: any }) => {
                const formData = convertToFormData(params.data);

                // Add _method for Laravel to handle PUT with FormData
                if (formData instanceof FormData) {
                    formData.append('_method', 'PUT');
                }

                return mutationApi({
                    method: 'post', // Use POST with _method=PUT for FormData
                    url: route(`${ROUTES.COMPLAINTS}.update`, params.id),
                    data: formData,
                    params: { _method: 'PUT' },
                    requestConfig: {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                });
            },
            invalidateQueryKeys: [{ queryKey: [TANSTACK_QUERY_KEYS.COMPLAINTS], exact: false }],
        });
    },

    // Custom method for public complaint submission
    useSubmitPublicComplaint: () => {
        return createMutation({
            mutationFn: async (params: any) => {
                const formData = convertToFormData(params);
                return mutationApi({
                    method: 'post',
                    url: route(`${ROUTES.COMPLAINTS}.store`),
                    data: formData,
                    params: { intent: IntentEnum.SUBMIT_PUBLIC_COMPLAINT },
                    requestConfig: {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                });
            },
            invalidateQueryKeys: [{ queryKey: [TANSTACK_QUERY_KEYS.COMPLAINTS], exact: false }],
        });
    },

    // Custom method for generating complaint report
    useGenerateReport: () => {
        return createMutation({
            mutationFn: async (params: { id: number }) => {
                return mutationApi({
                    method: 'get',
                    url: route(`${ROUTES.COMPLAINTS}.show`, params.id),
                    data: {},
                    params: { intent: IntentEnum.GENERATE_COMPLAINT_REPORT },
                });
            },
            invalidateQueryKeys: [], // No need to invalidate queries for report generation
        });
    },
};
