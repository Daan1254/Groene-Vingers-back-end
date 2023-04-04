import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CashRegisterService } from './cash-register.service';
import { LoginCashierDto } from './dto/login-cashier.dto';

@Controller('cash-register')
@ApiTags('CashRegister')
export class CashRegisterController {
  constructor(private readonly cashRegisterService: CashRegisterService) {}

  @Post('validate')
  public async test(@Body() body: LoginCashierDto) {
    return this.cashRegisterService.validate(body);
  }
}
