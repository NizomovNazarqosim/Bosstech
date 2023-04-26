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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../module/user.entity");
const typeorm_2 = require("typeorm");
const nodemailer_1 = require("../utils/nodemailer");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async hashPassword(password) {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        return hashedPassword;
    }
    async comparePassword(args) {
        const { password, hash } = args;
        return await bcrypt.compare(password, hash);
    }
    async signToken(args) {
        return this.jwtService.signAsync(args, { secret: '1q2w3e4r' });
    }
    async isHaveUser(payload) {
        const { email } = payload;
        const foundUser = await this.userRepository.findOne({ where: { email: email } });
        return foundUser;
    }
    async create(body, res, req) {
        const { password, username, email, image, address } = body;
        const isHave = await this.isHaveUser({ email: email });
        if (isHave) {
            throw new common_1.BadRequestException('You are already registered');
        }
        const hashedPassword = await this.hashPassword(password);
        const created = await this.userRepository.save({
            name: username, email, password: hashedPassword, user_image: image, address: address
        });
        const token = await this.signToken({ id: created.id, role: created.user_role });
        await (0, nodemailer_1.sendEmail)({
            email: email,
            subject: "Activate your account",
            text: `Hello ${username}, your account sign in with your account to BOSSTECH company`,
        });
        req.headers.token = token;
        res.status(201).json({
            success: true,
            message: `You are successfully registered`,
            token: token
        });
    }
    async login(body, res, req) {
        var _a;
        const { email, password } = body;
        const isHave = await this.isHaveUser({ email: email });
        const userPassword = (_a = JSON.parse(JSON.stringify(isHave))) === null || _a === void 0 ? void 0 : _a.password;
        if (!isHave || !userPassword) {
            throw new common_1.BadRequestException('You are not registered');
        }
        const isValidPassword = await this.comparePassword({ password: password, hash: userPassword });
        if (!isValidPassword)
            throw new common_1.BadRequestException('Your password is invalid, please enter valid one');
        const token = await this.signToken({ id: isHave.id, role: isHave.user_role });
        req.headers.token = token;
        res.status(200).send({
            success: true,
            message: 'You are login',
            token: token
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map