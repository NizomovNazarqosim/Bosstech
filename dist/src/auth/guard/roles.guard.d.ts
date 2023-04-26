import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../decorators/role_checker';
import { UserEntity } from 'module/user.entity';
import { Repository } from 'typeorm';
export interface IUser {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    address?: string;
    user_image?: string;
    user_role?: Role;
}
export declare class RolesGuard implements CanActivate {
    private reflector;
    private readonly userRepository;
    constructor(reflector: Reflector, userRepository: Repository<UserEntity>);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
