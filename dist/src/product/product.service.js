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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../../module/product.entity");
const user_entity_1 = require("../../module/user.entity");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../../module/category.entity");
let ProductService = class ProductService {
    constructor(productRepository, userRepository, categoryRepository, cacheManager) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.cacheManager = cacheManager;
    }
    async isHave(id) {
        return this.categoryRepository.findOne({ where: {
                category_id: id
            } }).catch(err => {
            var _a;
            return (_a = err === null || err === void 0 ? void 0 : err.detail) !== null && _a !== void 0 ? _a : err;
        });
    }
    async getOneProductById(id, res) {
        const result = await this.productRepository.findOne({
            where: {
                product_id: id
            }
        }).catch(err => {
            var _a;
            return (_a = err === null || err === void 0 ? void 0 : err.detail) !== null && _a !== void 0 ? _a : err;
        });
        return res.status(200).json(result);
    }
    async getAllProducts(res) {
        const cashedItem = await this.cacheManager.get('products');
        if (cashedItem) {
            return cashedItem;
        }
        const result = await this.productRepository.find().catch((err) => {
            return err;
        });
        await this.cacheManager.set('products', result);
        return res.status(200).json(result);
    }
    async getProducts(take = 10, skip = 0, res) {
        const result = await this.productRepository.find({ take, skip }).catch(err => {
            var _a;
            return (_a = err === null || err === void 0 ? void 0 : err.detail) !== null && _a !== void 0 ? _a : err;
        });
        return res.status(200).json(result);
    }
    async createProduct(body, res) {
        const { title, price, categoryId } = body;
        const isHaveCategory = await this.isHave(String(categoryId));
        if (!isHaveCategory.category_id) {
            return {
                success: false,
                message: 'Category not found'
            };
        }
        const result = await this.productRepository.save({
            product_title: title,
            product_price: price,
            categoryId: isHaveCategory,
        });
        return res.status(201).json(result);
    }
    async updateProduct(body, id) {
        if (body.categoryId) {
            var isHaveCategory1 = await this.isHave(String(body.categoryId));
            if (!isHaveCategory1.category_id) {
                return {
                    success: false,
                    message: 'Category not found'
                };
            }
        }
        const result = await this.productRepository.createQueryBuilder().update(product_entity_1.ProductEntity).set({
            product_title: body.title,
            product_price: body.price,
            categoryId: isHaveCategory1
        }).where("product_id = :id", { id: id }).execute();
        if ((result === null || result === void 0 ? void 0 : result.affected) == 1) {
            return {
                success: true,
                message: 'Updated this product'
            };
        }
        return {
            success: false,
            message: 'Bad Request error'
        };
    }
    async updateProductImage(req, filename, id) {
        const isHave = await this.productRepository.findOne({ where: { product_id: id } }).catch(err => {
            var _a;
            return (_a = err === null || err === void 0 ? void 0 : err.detail) !== null && _a !== void 0 ? _a : err;
        });
        if (!isHave) {
            return {
                success: false,
                message: 'This product not found'
            };
        }
        const result = await this.productRepository.createQueryBuilder().update(product_entity_1.ProductEntity).set({ product_image: filename }).where("product_id = :id", { id: id }).execute().catch((err) => {
            var _a;
            return (_a = err.detail) !== null && _a !== void 0 ? _a : err;
        });
        if (result.affected == 1) {
            return {
                success: true,
                message: 'Updated this product'
            };
        }
        return {
            success: false,
            message: 'Something went wrong'
        };
    }
    async deleteProduct(id, res) {
        const result = await this.productRepository.delete({ product_id: id }).catch(err => {
            var _a;
            return (_a = err === null || err === void 0 ? void 0 : err.detail) !== null && _a !== void 0 ? _a : err;
        });
        if (result.affected == 1) {
            return res.status(200).json({
                success: true,
                message: 'Deleted this product'
            });
        }
        return res.status(400).json({
            success: false,
            message: 'Not found'
        });
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository, Object])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map