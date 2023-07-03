import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PrismaService } from './database/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { AbsenceModule } from './modules/absence/absence.module';
import { ShoppingCartModule } from './modules/shopping-cart/shopping-cart.module';
import { CategoryModule } from './modules/category/category.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { OrderModule } from './modules/order/order.module';
import { StripeModule } from 'nestjs-stripe';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    StripeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        apiKey: configService.get('STRIPE_API_KEY'), // Make sure to set this in your .env file
        apiVersion: '2022-11-15',
      }),
    }),
    UserModule,
    AuthModule,
    ProductModule,
    AbsenceModule,
    ShoppingCartModule,
    CategoryModule,
    ScheduleModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
