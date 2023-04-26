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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const role_checker_1 = require("../decorators/role_checker");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../../module/user.entity");
const typeorm_2 = require("typeorm");
let RolesGuard = class RolesGuard {
    constructor(reflector, userRepository) {
        this.reflector = reflector;
        this.userRepository = userRepository;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(role_checker_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const req = context.switchToHttp().getRequest();
        const user = req === null || req === void 0 ? void 0 : req.user;
        if (!(user === null || user === void 0 ? void 0 : user.role))
            false;
        const result = requiredRoles.some((role) => { var _a; return (_a = user.role) === null || _a === void 0 ? void 0 : _a.includes(role); });
        return result;
    }
};
RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [core_1.Reflector,
        typeorm_2.Repository])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=roles.guard.js.map