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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("../utils/multer");
const product_dto_1 = require("./product.dto");
const swagger_1 = require("@nestjs/swagger");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    getAllProduct(res) {
        return this.productService.getAllProducts(res);
    }
    getOneProduct(id, res) {
        return this.productService.getOneProductById(id, res);
    }
    getProducts(take = 1, skip = 1, res) {
        take = take > 20 ? 20 : take;
        return this.productService.getProducts(take, skip, res);
    }
    createProduct(body, res) {
        return this.productService.createProduct(body, res);
    }
    async uploadFile(file, body, id) {
        if (!file.filename)
            return 'Internal server error';
        return this.productService.updateProductImage(body, file === null || file === void 0 ? void 0 : file.filename, id);
    }
    updateProduct(id, body) {
        return this.productService.updateProduct(body, id);
    }
    deleteProduct(id, res) {
        return this.productService.deleteProduct(id, res);
    }
};
__decorate([
    (0, swagger_1.ApiBadRequestResponse)({
        description: "Bad request error"
    }),
    (0, swagger_1.ApiOkResponse)({
        content: {
            Res: {
                example: [
                    {
                        product_id: "3582f48e-8f97-4f9a-8b35-b7f77a0acd18",
                        product_title: "Redmi 9T",
                        product_price: 7000,
                        created_at: "2023-04-25T13:21:11.507Z",
                        product_image: null
                    }
                ]
            }
        }
    }),
    (0, common_1.Get)('all'),
    (0, common_1.HttpCode)(common_1.HttpStatus.FOUND),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getAllProduct", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        content: {
            Res: {
                example: {
                    product_id: "3582f48e-8f97-4f9a-8b35-b7f77a0acd18",
                    product_title: "Nokia",
                    product_price: 7000,
                    created_at: "2023-04-25T13:21:11.507Z",
                    product_image: null
                }
            }
        }
    }),
    (0, swagger_1.ApiProperty)({
        name: "id",
        example: '3582f48e-8f97-4f9a-8b35-b7f77a0acd18'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        example: '3582f48e-8f97-4f9a-8b35-b7f77a0acd18'
    }),
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.FOUND),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getOneProduct", null);
__decorate([
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Bad request response'
    }),
    (0, swagger_1.ApiOkResponse)({
        content: {
            Res: {
                example: [
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
        }
    }),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.FOUND),
    __param(0, (0, common_1.Query)('take')),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, swagger_1.ApiBadRequestResponse)({
        description: "Bad request error"
    }),
    (0, swagger_1.ApiCreatedResponse)({
        content: {
            Res: {
                example: {
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
    }),
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductDto, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Post)('image/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multer_1.multerOptions)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "uploadFile", null);
__decorate([
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Bad request error'
    }),
    (0, swagger_1.ApiOkResponse)({
        content: {
            Res: {
                example: {
                    success: true,
                    message: "Updated this product"
                }
            }
        }
    }),
    (0, swagger_1.ApiProperty)({
        name: 'id',
        example: 'fda6689b-32c4-471d-a581-7a90696e19fa'
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        example: 'fda6689b-32c4-471d-a581-7a90696e19fa'
    }),
    (0, common_1.Put)('update/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, product_dto_1.ProductUpdateDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Bad request error'
    }),
    (0, swagger_1.ApiOkResponse)({
        content: {
            Res: {
                example: {
                    success: true,
                    message: 'Deleted this product'
                }
            }
        }
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        example: 'c9ae52fe-0e26-4f25-a0b5-bb90dbc66730'
    }),
    (0, common_1.Delete)('delete/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "deleteProduct", null);
ProductController = __decorate([
    (0, swagger_1.ApiTags)('product'),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map