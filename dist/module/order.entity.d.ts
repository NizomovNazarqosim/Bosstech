import { UserEntity } from "./user.entity";
interface OrderedItems {
    id: string;
    title: string;
    price: number;
    quantity: number;
    created_at?: any;
    product_image?: string;
}
export declare class OrderEntity {
    id: string;
    userId: UserEntity;
    arrayOfOrders: OrderedItems[];
    created_at: Date;
}
export {};
