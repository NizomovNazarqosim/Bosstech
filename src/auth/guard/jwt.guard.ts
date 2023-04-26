import { AuthGuard } from "@nestjs/passport";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}