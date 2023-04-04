wimport { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CashRegisterController } from './cash-register.controller';
import { CashRegisterService } from './cash-register.service';

@Module({
  controllers: [CashRegisterController],
  providers: [PrismaService, CashRegisterService],
  imports: [],
  exports: [],
})
export class CashRegisterModule {}
