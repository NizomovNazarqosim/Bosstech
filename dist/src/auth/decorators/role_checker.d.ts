export declare enum Role {
    USER = "user",
    PREMIUM = "premium",
    ADMIN = "admin"
}
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
