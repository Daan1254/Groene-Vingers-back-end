import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { HttpService } from '@nestjs/axios';
import { KUIN_BASE_URL } from '../../main';
import { ProductDto } from './dto/product.dto';
import { ProductGateway } from './product.gateway';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly productGateway: ProductGateway,
  ) {}

  async getKuinProducts() {
    try {
      const response = await this.httpService
        .get(`${KUIN_BASE_URL}/product`, {
          headers: {
            Authorization: `Bearer ${process.env.KUIN_API_KEY}`,
          },
        })
        .toPromise();

      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  async getKuinProduct(id) {
    try {
      const response = await this.httpService
        .get(`${KUIN_BASE_URL}/product/${id}`, {
          headers: {
            Authorization: `Bearer ${process.env.KUIN_API_KEY}`,
          },
        })
        .toPromise();

      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  async getProducts() {
    try {
      return await this.prisma.product.findMany({
        include: {
          stock: true,
        },
      });
    } catch (e) {
      Logger.error(e);
    }
  }

  async getProduct(uuid: string) {
    try {
      return await this.prisma.product.findUnique({
        where: {
          uuid,
        },
        include: {
          stock: true,
        },
      });
    } catch (e) {
      Logger.error(e);
      throw new NotFoundException('Product niet gevonden');
    }
  }

  async getProductsByCategory(uuid: string) {
    try {
      return await this.prisma.product.findMany({
        where: {
          categoryUuid: uuid,
        },
        include: {
          stock: true,
        },
      });
    } catch (e) {
      Logger.error(e);
    }
  }

  // create product
  async createProduct(productDto: ProductDto) {
    try {
      const createdProduct = await this.prisma.product.create({
        data: {
          ...productDto,
          stock: undefined,
        },
      });

      if (productDto.stock) {
        await this.prisma.stock.create({
          data: {
            quantity: productDto.stock.quantity,
            product: {
              connect: {
                uuid: createdProduct.uuid,
              },
            },
          },
        });
      }

      return createdProduct;
    } catch (e) {
      Logger.error(e);
    }
  }

  // get product on barcode
  async getProductByBarcode(barcode: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: {
          barcode,
        },
        include: {
          stock: true,
        },
      });

      // Send product to client
      this.productGateway.sendProduct(product);

      return product;
    } catch (e) {
      Logger.error(e);
      throw new NotFoundException('Product niet gevonden');
    }
  }
}
