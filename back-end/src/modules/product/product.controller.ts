import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import { AuthGuard, RequestWithAuth } from '../auth/auth.guard';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('kuin')
  @UseGuards(AuthGuard)
  @ApiHeaders([{ name: 'auth-token', description: 'Groene vingers API token' }])
  public async getKuinProducts() {
    return await this.productService.getKuinProducts();
  }

  @Get('kuin/:id')
  @UseGuards(AuthGuard)
  @ApiHeaders([{ name: 'auth-token', description: 'Groene vingers API token' }])
  public async getKuinProduct(@Param('id') id: string) {
    return await this.productService.getKuinProduct(id);
  }

  @Post('kuin')
  @UseGuards(AuthGuard)
  @ApiHeaders([{ name: 'auth-token', description: 'Groene vingers API token' }])
  orderKuinProduct(
    @Body() body: CreateProductDto,
    @Req() request: RequestWithAuth,
  ) {
    return this.productService.orderKuinProduct(body, request.user);
  }

  @Get('')
  async getProducts() {
    return this.productService.getProducts();
  }

  @Get(':uuid')
  async getProduct(@Param('uuid') uuid: string) {
    return await this.productService.getProduct(uuid);
  }
}
