const roleEnum = {
    SuperAdmin: 'SuperAdmin',
    Employee: 'Employee',
};

export const RoleEnum = roleEnum;

export type RoleEnum = (typeof RoleEnum)[keyof typeof RoleEnum];
