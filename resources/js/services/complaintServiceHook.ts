import { serviceHooksFactory } from '@/services/serviceHooksFactory';
import { ROUTES } from '@/support/constants/routes';
import { ComplaintResource } from '@/support/interfaces/resources';

export const complaintServiceHook = {
    ...serviceHooksFactory<ComplaintResource>({
        baseRoute: ROUTES.COMPLAINTS,
    }),
    customFunctionExample: async () => {
        console.log('custom function');
    },
};
