export declare class ProductDto {
    readonly id: string;
    readonly title: string;
    readonly image: string;
    readonly price: number;
    readonly createdAt: Date | string;
    readonly categoryId: any;
}
export declare class ProductUpdateDto {
    readonly id: string;
    readonly title: string;
    readonly image: string;
    readonly price: number;
    readonly createdAt: Date | string;
    readonly categoryId: any;
}
export interface ProductInterface {
    id?: string;
    title?: string;
    image?: string;
    price?: number;
    createdAt?: string | Date;
    categoryId?: any;
}
export interface ProductInterface2 {
    product_id?: string;
    product_title?: string;
    product_image?: string;
    product_price?: number;
    created_at?: string | Date;
    categoryIdCategoryId?: any;
}
