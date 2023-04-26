import { CategoryEntity } from 'module/category.entity';
import { Repository } from 'typeorm';
import { CategoryDto, CategoryUpdateDto } from './category.dto';
export declare class CategoryService {
    private readonly categotyRepository;
    constructor(categotyRepository: Repository<CategoryEntity>);
    getOneCategoryById(categoryId: string): Promise<CategoryEntity | {
        success: boolean;
        message: string;
    }>;
    getAllCategories(): Promise<any>;
    addNewCategory(body: CategoryDto): Promise<any>;
    updateCategory(body: CategoryUpdateDto, id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteCategory(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
