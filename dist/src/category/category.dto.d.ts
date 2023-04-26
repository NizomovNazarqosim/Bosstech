import { ProductInterface } from 'src/product/product.dto';
export declare class CategoryDto {
    id: string;
    title: string;
    createdAt: Date;
}
export declare class CategoryUpdateDto {
    title: string;
}
export interface CategoryInterface {
    id?: string;
    title?: string;
    createdAt?: Date;
    products?: any | ProductInterface;
}
