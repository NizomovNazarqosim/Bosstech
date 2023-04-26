import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'module/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity
    ]) , 
    PassportModule, JwtModule],
  controllers:[AuthController],
  providers: [AuthService,  LocalStrategy],
})
export class AuthModule {}
