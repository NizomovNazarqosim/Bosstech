import {Injectable} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'module/category.entity';
import { Repository } from 'typeorm';
import { verifyToken } from 'src/utils/jwt_verify';
import { UserEntity } from 'module/user.entity';
import { Request } from 'express';
import { CategoryDto, CategoryUpdateDto } from './category.dto';
import { AllExceptionsFilter } from 'src/error_handler/all_exception';


@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) private readonly categotyRepository: Repository<CategoryEntity>,
        // @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        ) { }
        // find category by categoryId 
        async getOneCategoryById(categoryId: string){
           const foundCategory = await this.categotyRepository.findOne({where:{
            category_id: categoryId
           }})
           if(!foundCategory) {
            return {
                success: true,
                message: 'This category not found'
            }
           }
           return foundCategory
        }
        // get all categories
        async getAllCategories() {
            const result = await this.categotyRepository.find().catch(err => {
                return err?.detail ?? err
            })
            return result
        };
        // add new category 
        async addNewCategory(body: CategoryDto){
            const result = await this.categotyRepository.save({
                category_title: body.title,
            }).catch(err => {
                return err?.detail ?? err
            })
            return result;
        }
        // update category by id
        async updateCategory(body: CategoryUpdateDto, id: string){
            const isHave = await this.categotyRepository.findOne({where:{
                category_id: id
            }}).catch(err => {
                return err.detail || err
            })
            if(!isHave){
                return {
                    success: false,
                    message: 'Category Not found'
                }
            }
            const result = await this.categotyRepository.createQueryBuilder().update(CategoryEntity).set({category_title: body.title}).where("category_id = :id", {id: id}).execute().catch((err) => {
                return err.detail ?? err
            })
            if(result.affected == 1){
                return {
                    success: true,
                    message: 'Updated this category'
                }
            }
            return {
                success: false,
                message: 'Something went wrong'
            }
        }
        // delete category by id
        async deleteCategory(id: string){
            const result = await this.categotyRepository.delete({category_id: id}).catch(err => {
                return err?.detail ?? err
            })
            if(result.affected == 1){
                return {
                    success: true,
                    message: 'Deleted this category'
                }
            }
            return {
                success: false,
                message: 'Not found'
            }
        }
}