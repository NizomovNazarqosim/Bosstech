import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsOptional, IsDate} from 'class-validator'
import { ProductInterface } from 'src/product/product.dto';

export class CategoryDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    id: string;
    
    @ApiProperty({
        example: 'Mebellar'
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDate()
    @IsNotEmpty()
    @IsOptional()
    createdAt: Date;
}
export class CategoryUpdateDto {
    @ApiProperty({
        example: 'Mebellar'
    })
    @IsString()
    @IsNotEmpty()
    title: string;
}

export interface CategoryInterface {
    id?: string;
    title?: string;
    createdAt?: Date;
    products?: any | ProductInterface;
}

