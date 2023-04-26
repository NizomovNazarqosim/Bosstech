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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
const multer_1 = require("../utils/multer");
const role_checker_1 = require("../auth/decorators/role_checker");
const roles_guard_1 = require("../auth/guard/roles.guard");
const user_dto_1 = require("./user.dto");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getOneUser(req, res) {
        return this.userService.getOneUser(req, res);
    }
    async uploadFile(file, req) {
        return this.userService.postUserImage(req, file.filename);
    }
    updateUser(req, body) {
        return this.userService.updateUser(req, body);
    }
};
__decorate([
    (0, role_checker_1.Roles)(role_checker_1.Role.ADMIN, role_checker_1.Role.USER, role_checker_1.Role.PREMIUM),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiHeader)({
        name: 'token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMDZjZDcxLTU2YjgtNGE5Zi04ZDY0LWQ3NTQ5NzY0NjBhNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjgxODk5NzQ4fQ.BdWzJQDlQLDKDoHDcdUCatk3RiWgZmGCQ03t-PmycbM'
    }),
    (0, swagger_1.ApiCreatedResponse)({
        content: {
            Res: {
                example: {
                    id: "5e06cd71-56b8-4a9f-8d64-d754976460a4",
                    name: "Eshmat",
                    email: "eshmat@gmail.com",
                    address: "Chilonzor 4-dom",
                    user_image: null,
                    user_role: "user",
                    created_at: "2023-04-19T10:00:40.885Z"
                }
            }
        }
    }),
    (0, common_1.Get)('one'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getOneUser", null);
__decorate([
    (0, common_1.Post)('image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multer_1.multerOptions)),
    (0, swagger_1.ApiBody)({
        required: true,
        type: 'multipart/form-data',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadFile", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMDZjZDcxLTU2YjgtNGE5Zi04ZDY0LWQ3NTQ5NzY0NjBhNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjgxODk5NzQ4fQ.BdWzJQDlQLDKDoHDcdUCatk3RiWgZmGCQ03t-PmycbM'
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Something went wrong'
    }),
    (0, swagger_1.ApiResponse)({
        content: {
            Res: {
                example: {
                    "success": true,
                    "message": "Updated this user information"
                }
            }
        }
    }),
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map