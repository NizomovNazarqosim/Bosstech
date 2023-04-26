import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class OrderedItems {
    id: string;
    title: string;
    price: number;
    quantity: number;
    created_at?: any;
    product_image?: string;
}


export class OrderDto{
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    id: string;

    @ApiProperty({
        example: {
            userId:"5e06cd71-56b8-4a9f-8d64-d754976460a4"
        }
    })
    @IsString()
    @IsNotEmpty()
    userId: any;


    @ApiProperty({
        example:[ 
        {
        quantity: 10,
        id:"fda6689b-32c4-471d-a581-7a90696e19fa"
        },
        {
        quantity: 20,
        id:"3582f48e-8f97-4f9a-8b35-b7f77a0acd18"
        }
    ]
    })
    @IsNotEmpty()
    @IsArray()
    orders: OrderedItems[]
}