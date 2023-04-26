import { ProductService } from './product.service';
import { ProductDto, ProductUpdateDto } from './product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAllProduct(res: any): Promise<any>;
    getOneProduct(id: any, res: any): Promise<any>;
    getProducts(take: number, skip: number, res: any): Promise<any>;
    createProduct(body: ProductDto, res: any): Promise<any>;
    uploadFile(file: any, body: Request | any, id: any): Promise<"Internal server error" | {
        success: boolean;
        message: string;
    }>;
    updateProduct(id: any, body: ProductUpdateDto): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteProduct(id: any, res: any): Promise<any>;
}
