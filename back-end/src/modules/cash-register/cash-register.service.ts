import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { LoginCashierDto } from './dto/login-cashier.dto';

@Injectable()
export class CashRegisterService {
  constructor(private readonly prisma: PrismaService) {}

  public async validate(body: LoginCashierDto) {
    try {
      const cashier = await this.prisma.cashier.findUnique({
        where: {
          pin: body.pin,
        },
      });
      if (!cashier) {
        throw new NotFoundException('Cashier not found');
      }

      return cashier;
    } catch (e) {
      Logger.error(e);
      throw new NotFoundException('Cashier not found');
    }
  }
}
