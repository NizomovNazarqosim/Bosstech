import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { OrderEntity } from "module/order.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "module/product.entity";


@Module({
    imports:[
        TypeOrmModule.forFeature([
            OrderEntity,
            ProductEntity,
          ]) , 
    ],
    controllers:[OrdersController],
    providers:[OrdersService]
})
export class OrdersModule {}