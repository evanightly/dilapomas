import { createMutation } from '@/helpers';
import { mutationApi } from '@/helpers/';
import { serviceHooksFactory } from '@/services/serviceHooksFactory';
import { ROUTES } from '@/support/constants/routes';
import { TANSTACK_QUERY_KEYS } from '@/support/constants/tanstackQueryKeys';
import { IntentEnum } from '@/support/enums/intentEnum';
import { ComplaintResource } from '@/support/interfaces/resources';

export const complaintServiceHook = {
    ...serviceHooksFactory<ComplaintResource>({
        baseRoute: ROUTES.COMPLAINTS,
        baseKey: TANSTACK_QUERY_KEYS.COMPLAINTS,
    }),

    // Custom method for public complaint submission
    useSubmitPublicComplaint: () => {
        return createMutation({
            mutationFn: async (params: any) => {
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
};
