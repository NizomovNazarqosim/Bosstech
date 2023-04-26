import { CategoryEntity } from "./category.entity";
export declare class ProductEntity {
    product_id: string;
    product_title: string;
    product_price: number;
    created_at: Date;
    product_image: string;
    categoryId: CategoryEntity;
}
