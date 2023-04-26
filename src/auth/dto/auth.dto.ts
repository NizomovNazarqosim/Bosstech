import { IsString, IsNotEmpty, IsEmail, IsOptional } from "class-validator";
import {ApiProperty} from '@nestjs/swagger'
export class CreateUserDto {
    @ApiProperty({
        example: 'Eshmat'
    })
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({
        example: 'eshmat@gmail.com'
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        example: '12345678'
    })
    @IsString()
    @IsNotEmpty()
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
    readonly image: string;
}

export class LoginUserDto {
    
    @ApiProperty({
        example: 'eshmat@gmail.com'
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        example: '12345678'
    })
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}