import {Controller, Get, Post, Put, Delete, Req, Res, Param, Query, UseInterceptors, UploadedFile, Body, ParseUUIDPipe, HttpCode, HttpStatus} from '@nestjs/common'
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/multer';
import { ProductDto, ProductInterface, ProductUpdateDto } from './product.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiProperty, ApiTags, ApiTooManyRequestsResponse } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {}

    // get all products
    @ApiBadRequestResponse({
        description:"Bad request error"
    })
    @ApiOkResponse({
        content: {
        Res:{
           example:[
            {
                product_id: "3582f48e-8f97-4f9a-8b35-b7f77a0acd18",
                product_title: "Redmi 9T",
                product_price: 7000,
                created_at: "2023-04-25T13:21:11.507Z",
                product_image: null
            }
        ]
        }
     }})
    @Get('all')
    @HttpCode(HttpStatus.FOUND)
    getAllProduct(@Res() res){
        return this.productService.getAllProducts(res)
    }
    // get one product
    @ApiOkResponse({
        content: {
            Res:{
                example:{
                  product_id: "3582f48e-8f97-4f9a-8b35-b7f77a0acd18",
                  product_title: "Nokia",
                  product_price: 7000,
                  created_at: "2023-04-25T13:21:11.507Z",
                  product_image: null
                }
           }
    }})
    @ApiProperty({
        name:"id",
        example: '3582f48e-8f97-4f9a-8b35-b7f77a0acd18'
    })
    @ApiParam({
        name:'id',
        example: '3582f48e-8f97-4f9a-8b35-b7f77a0acd18'
    })
    @Get(':id')
    @HttpCode(HttpStatus.FOUND)
    getOneProduct(@Param('id', new ParseUUIDPipe()) id, @Res() res){
        return this.productService.getOneProductById(id, res)
    }
    // get all products with pagination
    @ApiBadRequestResponse({
       description: 'Bad request response'
    })
    @ApiOkResponse({
        content: {
            Res:{
                example:[
                    [
                        {
                            product_id: "3582f48e-8f97-4f9a-8b35-b7f77a0acd18",
                            product_title: "Nokia",
                            product_price: 7000,
                            created_at: "2023-04-25T13:21:11.507Z",
                            product_image: null
                        }
                    ]
                ]
           }
    }})
    @Get()
    @HttpCode(HttpStatus.FOUND)
    getProducts(@Query('take') take: number = 1,
    @Query('skip') skip: number = 1, @Res() res){
        take = take > 20 ? 20 : take;
        return this.productService.getProducts(take, skip, res)
    }

    // add new product 
   
    @ApiBadRequestResponse({
        description:"Bad request error"
    })
    @ApiCreatedResponse({
        content: {
            Res:{
                example:{
                    product_title: "Iphone 14",
                    product_price: 12000,
                    categoryId: {
                      category_id: "4ae311c1-37ee-4624-a5b4-f298119168aa",
                      category_title: "Telefon",
                      created_at: "2023-04-19T16:21:48.421Z"
                    },
                    product_image: null,
                    product_id: "c9ae52fe-0e26-4f25-a0b5-bb90dbc66730",
                    created_at: "2023-04-26T06:51:27.334Z"
                  }
           }
    }
    })
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    createProduct(@Body() body: ProductDto, @Res() res){
        return this.productService.createProduct(body, res)
    }

    // update product image , and upload image
    @Post('image/:id')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async uploadFile(@UploadedFile() file, @Body() body: Request | any, @Param('id', new ParseUUIDPipe()) id) {
      if(!file.filename) return 'Internal server error'
      return this.productService.updateProductImage(body, file?.filename, id)
    }
    
    // update product
    @ApiBadRequestResponse({
        description: 'Bad request error'
    })
    @ApiOkResponse({
        content: {
            Res: {
                example:{
                    success: true,
                    message: "Updated this product"
                }
            }
        }
    })
    @ApiProperty({
        name: 'id',
        example: 'fda6689b-32c4-471d-a581-7a90696e19fa'
    })
    @ApiParam({
        name: 'id',
        example: 'fda6689b-32c4-471d-a581-7a90696e19fa'
    })
    @Put('update/:id')
    @HttpCode(HttpStatus.OK)
    updateProduct( @Param('id', new ParseUUIDPipe()) id, @Body() body: ProductUpdateDto){
        return this.productService.updateProduct(body, id)
    }

    // delete product
    @ApiBadRequestResponse({
        description: 'Bad request error'
    })
    @ApiOkResponse({
        content:{
            Res:{
                example:{
                    success: true,
                    message: 'Deleted this product'
                }
            }
        }
    })
    @ApiParam({
        name: 'id',
        example: 'c9ae52fe-0e26-4f25-a0b5-bb90dbc66730'
    })
    @Delete('delete/:id')
    @HttpCode(HttpStatus.OK)
    deleteProduct(@Param('id', new ParseUUIDPipe()) id, @Res() res){
        return this.productService.deleteProduct(id, res)
    }
}