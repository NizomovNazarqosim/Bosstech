import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { UserEntity } from 'module/user.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<UserEntity>, jwtService: JwtService);
    hashPassword(password: string): Promise<string>;
    comparePassword(args: {
        password: string;
        hash: string;
    }): Promise<boolean>;
    signToken(args: {
        id: string;
        role: string;
    }): Promise<string>;
    isHaveUser(payload: {
        email: string;
    }): Promise<UserEntity>;
    create(body: CreateUserDto, res: Response, req: Request): Promise<void>;
    login(body: LoginUserDto, res: Response, req: Request): Promise<void>;
}
