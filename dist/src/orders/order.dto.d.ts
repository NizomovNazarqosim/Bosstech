export declare class OrderedItems {
    id: string;
    title: string;
    price: number;
    quantity: number;
    created_at?: any;
    product_image?: string;
}
export declare class OrderDto {
    id: string;
    userId: any;
    orders: OrderedItems[];
}
