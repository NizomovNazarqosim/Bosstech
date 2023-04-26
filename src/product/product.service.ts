import {CACHE_MANAGER, Inject, Injectable} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'module/product.entity';
import { UserEntity } from 'module/user.entity';
import { Repository } from 'typeorm';
import { ProductDto, ProductInterface } from './product.dto';
import { CategoryEntity } from 'module/category.entity';
import { CategoryInterface } from 'src/category/category.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ) {}

    // this category is have or not
    async isHave(id: string){
        return this.categoryRepository.findOne({where:{
             category_id: id
        }}).catch(err => {
            return err?.detail ?? err
        })
    }

    // get one product by id
    async getOneProductById(id: string, res){
        const result = await this.productRepository.findOne({
            where:{
                product_id: id
            }
        }).catch(err => {
            return err?.detail ?? err
        })
        return res.status(200).json(result)
    }
    // get all products
    async getAllProducts(res){
        const cashedItem = await this.cacheManager.get('products')
        if(cashedItem){
            return cashedItem
        }
        const result = await this.productRepository.find().catch((err) => {
            return err
        })
        await this.cacheManager.set('products', result)
        return res.status(200).json(result)
    }
    // get all products with pagination
    async getProducts(take: number = 10, skip: number = 0, res){
        const result = await this.productRepository.find({take, skip}).catch(err => {
            return err?.detail ?? err
        })
        return res.status(200).json(result)
    }
    // create new  products
    async createProduct(body: ProductDto, res){
        const {title, price, categoryId} = body;
        const isHaveCategory = await this.isHave(String(categoryId))
        if(!isHaveCategory.category_id){
            return {
                success: false,
                message: 'Category not found'
            }
        }
        const result = await this.productRepository.save({
            product_title: title,
            product_price: price,
            categoryId: isHaveCategory,
        })
        return res.status(201).json(result)
    }
    // update product
    async updateProduct(body: ProductDto, id){
        if(body.categoryId){
            var isHaveCategory1 = await this.isHave(String(body.categoryId))
        if(!isHaveCategory1.category_id){
            return {
                success: false,
                message: 'Category not found'
            }
        }
        }
        const result = await this.productRepository.createQueryBuilder().update(ProductEntity).set({
            product_title: body.title,
            product_price: body.price,
            categoryId: isHaveCategory1
        }).where("product_id = :id", {id: id}).execute()
        if(result?.affected == 1){
            return {
                success: true,
                message: 'Updated this product'
            }
        }
        return {
            success: false,
            message: 'Bad Request error'
        }
    }

    // update product image and upload image
    async updateProductImage(req, filename, id){
        const isHave = await this.productRepository.findOne({where:{product_id: id}}).catch(err => {
            return err?.detail ?? err
        })
        if(!isHave){
            return {
                success: false,
                message: 'This product not found'
            }
        }
        const result = await this.productRepository.createQueryBuilder().update(ProductEntity).set({product_image: filename}).where("product_id = :id", {id: id}).execute().catch((err) => {
            return err.detail ?? err
        })
        if(result.affected == 1){
            return {
                success: true,
                message: 'Updated this product'
            }
        }
        return {
            success: false,
            message: 'Something went wrong'
        }
    }

    // delete product
    async deleteProduct(id: string, res){
        const result = await this.productRepository.delete({product_id: id}).catch(err => {
            return err?.detail ?? err
        })

        if(result.affected == 1){
            return res.status(200).json({
                success: true,
                message: 'Deleted this product'
            })
        }
        return res.status(400).json({
            success: false,
            message: 'Not found'
        })
    }


    
}