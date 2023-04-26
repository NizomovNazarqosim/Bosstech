import { OrdersService } from "./orders.service";
import { OrderDto } from "./order.dto";
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getAllOrders(): Promise<any>;
    getOneOrder(id: any): Promise<any>;
    createOrder(body: OrderDto): any;
}
