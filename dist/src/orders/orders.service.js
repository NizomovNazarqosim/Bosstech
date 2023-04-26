"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("../../module/order.entity");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../../module/product.entity");
const stripe_1 = require("stripe");
let OrdersService = class OrdersService {
    constructor(orderRepository, productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2022-11-15'
        });
    }
    async getAllOrders() {
        const result = await this.orderRepository.find()
            .catch((error) => {
            return error;
        });
        return result;
    }
    async getOneOrder(id) {
        console.log(id);
        const result = await this.orderRepository.findOne({ where: {
                id: id
            } })
            .catch((error) => {
            return error;
        });
        console.log(result);
        return result;
    }
    async createOrder(body) {
        const { orders, userId } = body;
        const allProducts = await this.productRepository.find()
            .catch(err => {
            return err;
        });
        const orderedProducts = [];
        const a = allProducts.map((product) => {
            orders.map(order => product.product_id == order.id ? orderedProducts.push(Object.assign(Object.assign({}, product), { quantity: order.quantity })) : false);
        });
        const result = await this.orderRepository.save({
            userId: userId,
            arrayOfOrders: orderedProducts
        }).catch((error) => {
            return error;
        });
        const totalPrice = orderedProducts.reduce((acc, item) => acc + item.quantity * item.product_price, 0);
        const session = await this.stripe.paymentIntents.create({
            amount: totalPrice * 100,
            currency: 'usd',
            payment_method_types: ['card'],
        }).catch(err => {
            return err;
        });
        return session;
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map