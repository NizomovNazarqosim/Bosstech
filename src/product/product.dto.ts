import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsOptional, IsNumber} from 'class-validator'
import { CategoryInterface } from 'src/category/category.dto';

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Iphone 14'
    })
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly image: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example:12000
    })
    readonly price: number;

    @IsNotEmpty()
    @IsOptional()
    readonly createdAt: Date | string;

    @IsNotEmpty()
    @ApiProperty({
        example:'4ae311c1-37ee-4624-a5b4-f298119168aa'
    })
    readonly categoryId: any;
}

export class ProductUpdateDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly id: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({
        example: 'Iphone 14'
    })
    readonly title: string;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly image: string;
    
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({
        example:12000
    })
    readonly price: number;
    
    @IsNotEmpty()
    @IsOptional()
    readonly createdAt: Date | string;
    
    @IsNotEmpty()
    @IsOptional()
    readonly categoryId: any;
}

export interface ProductInterface {
    id?:string;
    title?:string;
    image?:string;
    price?:number;
    createdAt?:string | Date;
    categoryId?: any;
}
export interface ProductInterface2 {
    product_id?:string;
    product_title?:string;
    product_image?:string;
    product_price?:number;
    created_at?:string | Date;
    categoryIdCategoryId?: any;
}

