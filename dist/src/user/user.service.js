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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../module/user.entity");
const typeorm_2 = require("typeorm");
const jwt_verify_1 = require("../utils/jwt_verify");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getAllUsers(req) {
    }
    async getOneUser(req, res) {
        const token = req.headers.token;
        const verifyedToken = await (0, jwt_verify_1.verifyToken)(String(token));
        const foundUser = await this.userRepository.findOne({ where: {
                id: verifyedToken === null || verifyedToken === void 0 ? void 0 : verifyedToken.id
            } });
        if (!foundUser) {
            return res.status(200).send({
                success: false,
                messsage: 'You are not registered'
            });
        }
        delete foundUser.password;
        res.send(foundUser);
    }
    async postUserImage(req, filename) {
        const token = req.headers.token;
        if (!token) {
            return 'You do not have token';
        }
        const verifyed = await (0, jwt_verify_1.verifyToken)(token);
        const userData = JSON.parse(JSON.stringify(verifyed));
        const IsUser = await this.userRepository.findOne({ where: {
                id: userData.id
            } });
        if (!IsUser) {
            return {
                succes: false,
                message: 'This user not found'
            };
        }
        IsUser.user_image = filename;
        if (!filename)
            throw new common_1.BadRequestException('Something went wrong');
        await this.userRepository.createQueryBuilder().update(user_entity_1.UserEntity).set({ user_image: filename }).where("id = :id", { id: verifyed }).execute();
        return {
            success: true,
            message: 'This image added'
        };
    }
    async updateUser(req, body) {
        var _a;
        const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.token;
        if (!token) {
            return 'You do not have token';
        }
        const verifyed = await (0, jwt_verify_1.verifyToken)(token);
        const userData = JSON.parse(JSON.stringify(verifyed));
        const IsUser = await this.userRepository.findOne({ where: {
                id: userData.id
            } });
        if (!IsUser) {
            return {
                succes: false,
                message: 'This user not found'
            };
        }
        const result = await this.userRepository.createQueryBuilder().update(user_entity_1.UserEntity).set(body).where("id = :id", { id: IsUser.id }).execute();
        if ((result === null || result === void 0 ? void 0 : result.affected) == 1) {
            return {
                success: true,
                message: 'Updated this user information'
            };
        }
        return {
            success: false,
            message: 'Bad Request error'
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map