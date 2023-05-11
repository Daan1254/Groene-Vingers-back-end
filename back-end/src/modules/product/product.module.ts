import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from '../../database/prisma.service';
import { OrderModule } from '../order/order.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
  imports: [HttpModule, OrderModule],
  exports: [ProductService],
})
export class ProductModule {}
