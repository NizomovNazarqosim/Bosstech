import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginUserDto } from "./dto/auth.dto";
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    register(body: CreateUserDto, res: Response, req: Request): Promise<void>;
    login(body: LoginUserDto, res: Response, req: any): Promise<void>;
}
