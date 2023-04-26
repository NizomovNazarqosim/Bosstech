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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
const category_dto_1 = require("./category.dto");
const swagger_1 = require("@nestjs/swagger");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    getOneCategory(id) {
        return this.categoryService.getOneCategoryById(id);
    }
    getAllCategories() {
        return this.categoryService.getAllCategories();
    }
    createCategory(body) {
        return this.categoryService.addNewCategory(body);
    }
    updateCategory(body, id) {
        console.log(id);
        return this.categoryService.updateCategory(body, String(id));
    }
    deleteCategory(id) {
        return this.categoryService.deleteCategory(id);
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({
        name: "id",
        example: '322016ec-44eb-4294-8ccc-5782dab21dbd'
    }),
    (0, swagger_1.ApiOkResponse)({
        content: {
            Res: {
                example: {
                    id: "5e06cd71-56b8-4a9f-8d64-d754976460a4",
                    category_title: "Texnika",
                    created_at: '5159448615'
                }
            }
        }
    }),
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getOneCategory", null);
__decorate([
    (0, swagger_1.ApiBadRequestResponse)({
        description: "Bad request error"
    }),
    (0, swagger_1.ApiOkResponse)({
        content: {
            Res: {
                example: [
                    {
                        id: "5e06cd71-56b8-4a9f-8d64-d754976460a4",
                        category_title: "Texnika",
                        created_at: '5159448615'
                    },
                    {
                        id: "51efwf1f-ewfwf-wfrf1-fer1-wrfw1515fc",
                        category_title: "Kompyuter",
                        created_at: '782551511'
                    }
                ]
            }
        }
    }),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "getAllCategories", null);
__decorate([
    (0, swagger_1.ApiBadRequestResponse)({
        description: "Bad request error"
    }),
    (0, swagger_1.ApiOkResponse)({
        content: {
            Res: {
                example: {
                    category_title: "Kiyimlar",
                    category_id: "322016ec-44eb-4294-8ccc-5782dab21dbd",
                    created_at: "2023-04-19T16:18:12.664Z"
                }
            }
        }
    }),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CategoryDto]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, swagger_1.ApiBadRequestResponse)({
        description: "Bad request error"
    }),
    (0, swagger_1.ApiOkResponse)({
        content: {
            Res: {
                example: {
                    success: true,
                    message: "Updated this category"
                }
            }
        }
    }),
    (0, swagger_1.ApiProperty)({
        name: "id",
        example: '322016ec-44eb-4294-8ccc-5782dab21dbd'
    }),
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CategoryUpdateDto, String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, swagger_1.ApiBadRequestResponse)({
        description: "Bad request error"
    }),
    (0, swagger_1.ApiOkResponse)({
        content: {
            Res: {
                example: {
                    success: true,
                    message: "Delete this category"
                }
            }
        }
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        example: '322016ec-44eb-4294-8ccc-5782dab21dbd'
    }),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoryController.prototype, "deleteCategory", null);
CategoryController = __decorate([
    (0, swagger_1.ApiTags)('category'),
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map