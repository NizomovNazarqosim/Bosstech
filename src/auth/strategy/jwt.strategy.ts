import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      ignoreExpiration: false,
      secretOrKey: '1q2w3e4r',
      passReqToCallback: true,
    });
  }
  async validate(req: any, payload: any) {
   req.user = await payload.id
    return payload;
  }
}
