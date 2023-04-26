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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const order_dto_1 = require("./order.dto");
const swagger_1 = require("@nestjs/swagger");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    getAllOrders() {
        return this.ordersService.getAllOrders();
    }
    getOneOrder(id) {
        return this.ordersService.getOneOrder(id);
    }
    createOrder(body) {
        try {
            return this.ordersService.createOrder(body);
        }
        catch (error) {
            return error;
        }
    }
};
__decorate([
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Bad request error'
    }),
    (0, swagger_1.ApiOkResponse)({
        content: {
            Res: {
                example: [{
                        id: "0fc126b6-6af9-4bf4-b6b8-27d277452fd2",
                        arrayOfOrders: [
                            "{\"product_id\":\"3582f48e-8f97-4f9a-8b35-b7f77a0acd18\",\"product_title\":\"Redmi 9T\",\"product_price\":7000,\"created_at\":\"2023-04-25T13:21:11.507Z\",\"product_image\":null,\"quantity\":20}",
                            "{\"product_id\":\"fda6689b-32c4-471d-a581-7a90696e19fa\",\"product_title\":\"Nokia\",\"product_price\":11111,\"created_at\":\"2023-04-26T06:59:12.594Z\",\"product_image\":null,\"quantity\":10}"
                        ],
                        created_at: "2023-04-26T12:59:08.913Z"
                    }]
            }
        }
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getAllOrders", null);
__decorate([
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Bad request error'
    }),
    (0, swagger_1.ApiOkResponse)({
        content: {
            Res: {
                example: {
                    id: "0fc126b6-6af9-4bf4-b6b8-27d277452fd2",
                    arrayOfOrders: [
                        "{\"product_id\":\"3582f48e-8f97-4f9a-8b35-b7f77a0acd18\",\"product_title\":\"Redmi 9T\",\"product_price\":7000,\"created_at\":\"2023-04-25T13:21:11.507Z\",\"product_image\":null,\"quantity\":20}",
                        "{\"product_id\":\"fda6689b-32c4-471d-a581-7a90696e19fa\",\"product_title\":\"Nokia\",\"product_price\":11111,\"created_at\":\"2023-04-26T06:59:12.594Z\",\"product_image\":null,\"quantity\":10}"
                    ],
                    created_at: "2023-04-26T12:59:08.913Z"
                }
            }
        }
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        example: '0fc126b6-6af9-4bf4-b6b8-27d277452fd2'
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getOneOrder", null);
__decorate([
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Bad request error'
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.OrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "createOrder", null);
OrdersController = __decorate([
    (0, swagger_1.ApiTags)('order'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
exports.OrdersController = OrdersController;
//# sourceMappingURL=orders.controller.js.map