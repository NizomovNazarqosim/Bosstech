import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY, Role } from '../decorators/role_checker';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'module/user.entity';
import { Repository } from 'typeorm';
 export interface IUser{
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    address?: string;
    user_image?: string;
    user_role?: Role;
 }

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req?.user
    if(!user?.role) false
    const result = requiredRoles.some((role) => user.role?.includes(role));
    return result
  }
}
