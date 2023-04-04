import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./modules/user/user.module";
import {PrismaService} from "./database/prisma.service";
import {AuthModule} from "./modules/auth/auth.module";
import {ProductModule} from "./modules/product/product.module";
import {AbsenceModule} from "./modules/absence/absence.module";
import {ShoppingCartModule} from "./modules/shopping-cart/shopping-cart.module";
import { CashRegisterModule } from './modules/cash-register/cash-register.module';
@Module({
  imports: [
      UserModule,
      AuthModule,
      ProductModule,
      AbsenceModule,
      ShoppingCartModule,
      CashRegisterModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
