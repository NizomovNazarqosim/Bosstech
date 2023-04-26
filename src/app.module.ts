import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import {APP_FILTER} from '@nestjs/core'
import { AllExceptionsFilter } from './error_handler/all_exception';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { OrdersModule } from './orders/orders.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule,
    OrdersModule,
  ],
  providers:[
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ]
})
export class AppModule {}
    
