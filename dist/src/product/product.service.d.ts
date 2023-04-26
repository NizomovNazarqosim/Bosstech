import { ProductEntity } from 'module/product.entity';
import { UserEntity } from 'module/user.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './product.dto';
import { CategoryEntity } from 'module/category.entity';
import { Cache } from 'cache-manager';
export declare class ProductService {
    private productRepository;
    private readonly userRepository;
    private readonly categoryRepository;
    private readonly cacheManager;
    constructor(productRepository: Repository<ProductEntity>, userRepository: Repository<UserEntity>, categoryRepository: Repository<CategoryEntity>, cacheManager: Cache);
    isHave(id: string): Promise<any>;
    getOneProductById(id: string, res: any): Promise<any>;
    getAllProducts(res: any): Promise<any>;
    getProducts(take: number, skip: number, res: any): Promise<any>;
    createProduct(body: ProductDto, res: any): Promise<any>;
    updateProduct(body: ProductDto, id: any): Promise<{
        success: boolean;
        message: string;
    }>;
    updateProductImage(req: any, filename: any, id: any): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteProduct(id: string, res: any): Promise<any>;
}
