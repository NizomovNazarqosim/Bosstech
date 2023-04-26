export declare class UserDto {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly address: string;
    readonly user_image: string;
    readonly user_role: string;
    readonly created_at: any;
}
export interface UserInterface {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    address?: string;
    user_image?: string;
    user_role?: string;
    created_at?: any;
    products?: any;
}
