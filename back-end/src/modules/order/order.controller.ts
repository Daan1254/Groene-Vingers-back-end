import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';

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

  //   create order
  @Post('')
  @UseGuards(AuthGuard)
  @ApiHeaders([{ name: 'auth-token', description: 'Groene vingers API token' }])
  async createOrder(@Body() body: CreateOrderDto, @Req() req) {
    return this.orderService.createOrder(body, req.user);
  }
}
