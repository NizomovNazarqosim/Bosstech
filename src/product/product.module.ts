import {CacheModule, Module} from '@nestjs/common'
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'module/product.entity';
import { UserEntity } from 'module/user.entity';
import { CategoryEntity } from 'module/category.entity';

@Module({
    imports:[
        CacheModule.register({
            isGlobal:true
        }) ,
        TypeOrmModule.forFeature([
            ProductEntity,
            UserEntity,
            CategoryEntity
          ]) , 
    ],
    controllers:[ProductController],
    providers:[ProductService]
})
export class ProductModule {}