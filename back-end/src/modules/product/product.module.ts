import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from '../../database/prisma.service';
import { OrderModule } from '../order/order.module';
import { ProductGateway } from './product.gateway';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, ProductGateway],
  imports: [HttpModule, OrderModule],
  exports: [ProductService],
})
export class ProductModule {}
