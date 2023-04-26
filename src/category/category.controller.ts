import {Controller, Get, Post, Put, Delete, Req, Res, Body, Param, HttpStatus, HttpCode, ParseUUIDPipe} from '@nestjs/common'
import { CategoryService } from './category.service';
import { CategoryDto, CategoryUpdateDto } from './category.dto';
import {} from 'class-transformer'
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
    ) {}
// starting of get one category by id
    @ApiProperty({
        name:"id",
        example: '322016ec-44eb-4294-8ccc-5782dab21dbd'
    })
      @ApiOkResponse({
        content: {
        Res:{
           example:{
            id: "5e06cd71-56b8-4a9f-8d64-d754976460a4",
            category_title: "Texnika",
            created_at: '5159448615'  
        }
        }
     }})
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getOneCategory(@Param('id') id: string){
      return this.categoryService.getOneCategoryById(id)
    }

    // starting of getting all products
    @ApiBadRequestResponse({
        description:"Bad request error"
    })
    @ApiOkResponse({
        content: {
        Res:{
           example:[
            {
            id: "5e06cd71-56b8-4a9f-8d64-d754976460a4",
            category_title: "Texnika",
            created_at: '5159448615'  
            },
            {
            id: "51efwf1f-ewfwf-wfrf1-fer1-wrfw1515fc",
            category_title: "Kompyuter",
            created_at: '782551511'  
            }
          ]
        }
     }})
    @Get()
    @HttpCode(HttpStatus.OK)
    getAllCategories(){
       return this.categoryService.getAllCategories()
    }

    // starting of create new category part
    @ApiBadRequestResponse({
        description:"Bad request error"
    })
    @ApiOkResponse({
        content: {
        Res:{
           example:{
            category_title: "Kiyimlar",
            category_id: "322016ec-44eb-4294-8ccc-5782dab21dbd",
            created_at: "2023-04-19T16:18:12.664Z"
           }
        }
     }})
    @Post()
    @HttpCode(HttpStatus.CREATED)
    createCategory(@Body() body: CategoryDto){
        return this.categoryService.addNewCategory(body)
    }
    
    // starting of updating part
    @ApiBadRequestResponse({
        description:"Bad request error"
    })
    @ApiOkResponse({
        content: {
            Res:{
                example:{
                    success: true,
                    message: "Updated this category"
                }
            }
        }})
     @ApiProperty({
        name:"id",
        example: '322016ec-44eb-4294-8ccc-5782dab21dbd'
    })
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    updateCategory(@Body() body: CategoryUpdateDto, @Param('id') id: string) {
        console.log(id)
        return this.categoryService.updateCategory(body, String(id))
    }


    @ApiBadRequestResponse({
        description:"Bad request error"
    })
    @ApiOkResponse({
        content: {
            Res:{
                example:{
                    success: true,
                    message: "Delete this category"
                }
            }
    }})
    @ApiParam({
        name: 'id',
        example: '322016ec-44eb-4294-8ccc-5782dab21dbd'
    })
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    deleteCategory(@Param('id') id:string){
        return this.categoryService.deleteCategory(id)
    }
}