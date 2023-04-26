import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "module/order.entity";
import { Repository } from "typeorm";
import { OrderDto } from "./order.dto";
import { UserEntity } from "module/user.entity";
import { ProductEntity } from "module/product.entity";
import { ProductDto, ProductInterface, ProductInterface2 } from "src/product/product.dto";
import Stripe from "stripe";


@Injectable()
export class OrdersService {
    private stripe;
    constructor(
        @InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>,
        @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
    ) {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2022-11-15'
        })
    }

    async getAllOrders(){
        const result = await this.orderRepository.find()
         .catch((error) => {
            return error
         })
         return result
    }
    async getOneOrder(id){
        console.log(id)
        const result = await this.orderRepository.findOne({where: {
            id: id
        }})
        .catch((error) => {
            return error
        })
        console.log(result)
         return result
    }

    async createOrder(body: OrderDto){
        const { orders, userId } = body
        const allProducts: ProductInterface2[] = await this.productRepository.find()
          .catch(err => {
            return err
        })
        const orderedProducts = []
        const a = allProducts.map((product: ProductInterface2) => {
            orders.map(order => product.product_id == order.id ? orderedProducts.push({...product, quantity: order.quantity}) : false)

        })
        const result = await this.orderRepository.save({
            userId: userId,
            arrayOfOrders: orderedProducts
        }).catch((error) => {
            return error
        })

            const totalPrice = orderedProducts.reduce((acc, item) => acc + item.quantity*item.product_price ,0) 
            const session = await this.stripe.paymentIntents.create({
               amount: totalPrice * 100,  //cents
               currency: 'usd',
               payment_method_types: ['card'],
            }).catch(err => {
                return err
            })
            return session

    }
}