import { serviceHooksFactory } from '@/services/serviceHooksFactory';
import { ROUTES } from '@/support/constants/routes';
import { ComplaintEvidenceResource } from '@/support/interfaces/resources';

export const complaintEvidenceServiceHook = {
    ...serviceHooksFactory<ComplaintEvidenceResource>({
        baseRoute: ROUTES.COMPLAINT_EVIDENCES,
    }),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
