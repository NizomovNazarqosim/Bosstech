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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("../../module/category.entity");
const typeorm_2 = require("typeorm");
let CategoryService = class CategoryService {
    constructor(categotyRepository) {
        this.categotyRepository = categotyRepository;
    }
    async getOneCategoryById(categoryId) {
        const foundCategory = await this.categotyRepository.findOne({ where: {
                category_id: categoryId
            } });
        if (!foundCategory) {
            return {
                success: true,
                message: 'This category not found'
            };
        }
        return foundCategory;
    }
    async getAllCategories() {
        const result = await this.categotyRepository.find().catch(err => {
            var _a;
            return (_a = err === null || err === void 0 ? void 0 : err.detail) !== null && _a !== void 0 ? _a : err;
        });
        return result;
    }
    ;
    async addNewCategory(body) {
        const result = await this.categotyRepository.save({
            category_title: body.title,
        }).catch(err => {
            var _a;
            return (_a = err === null || err === void 0 ? void 0 : err.detail) !== null && _a !== void 0 ? _a : err;
        });
        return result;
    }
    async updateCategory(body, id) {
        const isHave = await this.categotyRepository.findOne({ where: {
                category_id: id
            } }).catch(err => {
            return err.detail || err;
        });
        if (!isHave) {
            return {
                success: false,
                message: 'Category Not found'
            };
        }
        const result = await this.categotyRepository.createQueryBuilder().update(category_entity_1.CategoryEntity).set({ category_title: body.title }).where("category_id = :id", { id: id }).execute().catch((err) => {
            var _a;
            return (_a = err.detail) !== null && _a !== void 0 ? _a : err;
        });
        if (result.affected == 1) {
            return {
                success: true,
                message: 'Updated this category'
            };
        }
        return {
            success: false,
            message: 'Something went wrong'
        };
    }
    async deleteCategory(id) {
        const result = await this.categotyRepository.delete({ category_id: id }).catch(err => {
            var _a;
            return (_a = err === null || err === void 0 ? void 0 : err.detail) !== null && _a !== void 0 ? _a : err;
        });
        if (result.affected == 1) {
            return {
                success: true,
                message: 'Deleted this category'
            };
        }
        return {
            success: false,
            message: 'Not found'
        };
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map