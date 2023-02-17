import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./modules/user/user.module";
import {PrismaService} from "./database/prisma.service";
import {AuthModule} from "./modules/auth/auth.module";


@Module({
  imports: [
      UserModule,
      AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
