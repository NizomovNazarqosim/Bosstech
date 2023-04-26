import {Module} from '@nestjs/common'
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtStartegy } from 'src/auth/strategy/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'module/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity
          ]) , 
          JwtModule,
    ],
    controllers: [UserController],
    providers: [UserService, JwtStartegy, JwtService]
})
export class UserModule {}