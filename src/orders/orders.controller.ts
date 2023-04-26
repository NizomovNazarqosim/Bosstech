import { Body, Controller, Get, Post, Param } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrderDto } from "./order.dto";
import { ApiBadRequestResponse, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags('order')
@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ){}

    @ApiBadRequestResponse({
        description: 'Bad request error'
    })
    @ApiOkResponse({
        content: {
            Res: {
                example:[{
                    id: "0fc126b6-6af9-4bf4-b6b8-27d277452fd2",
                arrayOfOrders: [
                    "{\"product_id\":\"3582f48e-8f97-4f9a-8b35-b7f77a0acd18\",\"product_title\":\"Redmi 9T\",\"product_price\":7000,\"created_at\":\"2023-04-25T13:21:11.507Z\",\"product_image\":null,\"quantity\":20}",
                    "{\"product_id\":\"fda6689b-32c4-471d-a581-7a90696e19fa\",\"product_title\":\"Nokia\",\"product_price\":11111,\"created_at\":\"2023-04-26T06:59:12.594Z\",\"product_image\":null,\"quantity\":10}"
                ],
                created_at: "2023-04-26T12:59:08.913Z"
                }]
            }
        }
    })
    @Get()
    getAllOrders(){
        return this.ordersService.getAllOrders()
    }

    @ApiBadRequestResponse({
        description: 'Bad request error'
    })
    @ApiOkResponse({
        content: {
            Res: {
                example:{
                    id: "0fc126b6-6af9-4bf4-b6b8-27d277452fd2",
                arrayOfOrders: [
                    "{\"product_id\":\"3582f48e-8f97-4f9a-8b35-b7f77a0acd18\",\"product_title\":\"Redmi 9T\",\"product_price\":7000,\"created_at\":\"2023-04-25T13:21:11.507Z\",\"product_image\":null,\"quantity\":20}",
                    "{\"product_id\":\"fda6689b-32c4-471d-a581-7a90696e19fa\",\"product_title\":\"Nokia\",\"product_price\":11111,\"created_at\":\"2023-04-26T06:59:12.594Z\",\"product_image\":null,\"quantity\":10}"
                ],
                created_at: "2023-04-26T12:59:08.913Z"
                }
            }
        }
    })
    @ApiParam({
        name: 'id',
        example: '0fc126b6-6af9-4bf4-b6b8-27d277452fd2'
    })
    @Get(':id')
    getOneOrder(@Param('id') id){
        return this.ordersService.getOneOrder(id)
    }


    @ApiBadRequestResponse({
        description: 'Bad request error'
    })
    @Post()
    createOrder(@Body() body: OrderDto){
        try {
            return this.ordersService.createOrder(body)
        } catch (error) {
            return error
        }
    }

 
}