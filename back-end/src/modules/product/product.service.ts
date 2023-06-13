import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { HttpService } from '@nestjs/axios';
import { KUIN_BASE_URL } from '../../main';
import { CreateProductDto } from './dto/create-product.dto';
import { KuinOrderDto } from './dto/kuin-order.dto';
import { Product } from '@prisma/client';
import { OrderService } from '../order/order.service';
import { UserDto } from '../auth/dto/user.dto';
import { ProductGateway } from './product.gateway';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly productGateway: ProductGateway,
    private readonly orderService: OrderService,
  ) {}

  async getKuinProducts() {
    await this.orderService.refreshKuinOrders();
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
    await this.orderService.refreshKuinOrders();
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
    await this.orderService.refreshKuinOrders();
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
  // async createProduct(productDto: ProductDto) {
  //   try {
  //     const createdProduct = await this.prisma.product.create({
  //       data: {
  //         ...productDto,
  //         stock: undefined,
  //       },
  //     });
  //
  //     if (productDto.stock) {
  //       await this.prisma.stock.create({
  //         data: {
  //           quantity: productDto.stock.quantity,
  //           product: {
  //             connect: {
  //               uuid: createdProduct.uuid,
  //             },
  //           },
  //         },
  //       });
  //     }
  //
  //     return createdProduct;
  //   } catch (e) {
  //     Logger.error(e);
  //   }
  // }

  async orderKuinProduct(body: CreateProductDto, user: UserDto) {
    await this.orderService.refreshKuinOrders();
    try {
      const order = await this.httpService
        .post<KuinOrderDto>(
          `${KUIN_BASE_URL}/orderItem`,
          {
            product_id: body.kuinId,
            quantity: body.quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.KUIN_API_KEY}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .toPromise();

      const doesProductExist: boolean = await this.doesProductExist(
        body.kuinId,
      );

      let product = null;

      if (!doesProductExist) {
        product = await this.createProduct(body);
      } else {
        product = await this.prisma.product.findFirst({
          where: {
            kuinId: body.kuinId,
          },
          include: {
            stock: true,
          },
        });
      }

      return await this.orderService.createOrder(
        {
          kuinId: body.kuinId,
          quantity: body.quantity,
          productUuid: product.uuid,
          orderId: order.data.order_id,
        },
        user,
      );
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(
        'Er is iets fout gegaan bij het bestellen van de producten',
      );
    }
  }

  async doesProductExist(kuinId: number) {
    try {
      const product = await this.prisma.product.count({
        where: {
          kuinId,
        },
      });

      return product > 0;
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

  private async createProduct(product: CreateProductDto): Promise<Product> {
    await this.orderService.refreshKuinOrders();
    try {
      return await this.prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          stock: {
            create: {
              quantity: product.quantity,
            },
          },
          kuinId: product.kuinId,
        },
        include: {
          stock: true,
        },
      });
    } catch (e) {
      console.error(e);
      Logger.error(e);
    }
  }
}
