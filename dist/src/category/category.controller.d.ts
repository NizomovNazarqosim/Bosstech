import { CategoryService } from './category.service';
import { CategoryDto, CategoryUpdateDto } from './category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getOneCategory(id: string): Promise<import("../../module/category.entity").CategoryEntity | {
        success: boolean;
        message: string;
    }>;
    getAllCategories(): Promise<any>;
    createCategory(body: CategoryDto): Promise<any>;
    updateCategory(body: CategoryUpdateDto, id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteCategory(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
