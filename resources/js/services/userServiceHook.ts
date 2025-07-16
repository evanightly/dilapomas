import { serviceHooksFactory } from '@/services/serviceHooksFactory';
import { ROUTES } from '@/support/constants/routes';
import { UserResource } from '@/support/interfaces/resources';

export const userServiceHook = {
    ...serviceHooksFactory<UserResource>({
        baseRoute: ROUTES.USERS,
    }),
};
