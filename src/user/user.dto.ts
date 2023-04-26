import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import {ApiProperty} from '@nestjs/swagger'
export class UserDto{
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly id: string;

    @ApiProperty({
        example: 'Eshmat'
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly name: string;

    @ApiProperty({
        example: 'eshmat@gmail.com'
    })
    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    readonly email: string;

    @ApiProperty({
        example: 'Eshmat12345'
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly password: string;

    @ApiProperty({
        example: 'Chilonzor 4-dom'
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly address: string;


    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly user_image: string;


    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly user_role: string;


    @IsString()
    @IsNotEmpty()
    @IsOptional()
    readonly created_at: any;
}

export interface UserInterface {
    id?:string;
    name?:string;
    email?:string;
    password?:string;
    address?:string;
    user_image?:string;
    user_role?:string;
    created_at?:any;
    products?: any;
}