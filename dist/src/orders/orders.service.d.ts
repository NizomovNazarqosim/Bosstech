import { OrderEntity } from "module/order.entity";
import { Repository } from "typeorm";
import { OrderDto } from "./order.dto";
import { ProductEntity } from "module/product.entity";
export declare class OrdersService {
    private readonly orderRepository;
    private readonly productRepository;
    private stripe;
    constructor(orderRepository: Repository<OrderEntity>, productRepository: Repository<ProductEntity>);
    getAllOrders(): Promise<any>;
    getOneOrder(id: any): Promise<any>;
    createOrder(body: OrderDto): Promise<any>;
}
