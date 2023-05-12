import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('')
  @UseGuards(AuthGuard)
  @ApiHeaders([{ name: 'auth-token', description: 'Groene vingers API token' }])
  async getOrders() {
    return this.orderService.getOrders();
  }
}
