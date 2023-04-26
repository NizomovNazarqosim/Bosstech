import { OrderEntity } from "./order.entity";
export declare class UserEntity {
    id: string;
    name: string;
    email: string;
    password: string;
    address: string;
    user_image: string;
    user_role: string;
    created_at: Date;
    orders: OrderEntity[];
}
