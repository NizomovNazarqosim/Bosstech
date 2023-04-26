import { ProductEntity } from "./product.entity";
export declare class CategoryEntity {
    category_id: string;
    category_title: string;
    created_at: Date;
    products: ProductEntity[];
}
