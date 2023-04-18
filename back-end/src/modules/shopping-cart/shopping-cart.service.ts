import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class ShoppingCartService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductService,
  ) {}

  async getShoppingCartFromUser(uuid: any) {
    try {
      const shoppingCart = await this.prisma.shoppingCart.count();
      if (shoppingCart === 0) {
        return await this.prisma.shoppingCart.create({
          data: {
            userUuid: uuid,
          },
        });
      }

      return await this.prisma.shoppingCart.findUnique({
        where: {
          userUuid: uuid,
        },
        include: {
          productsOnShoppingCart: true,
        },
      });
    } catch (e) {
      Logger.error(e);
    }
  }

  async addProductToShoppingCart(uuid: string, productId: string) {
    try {
      const product = await this.productService.getKuinProduct(productId);

      if (!product) {
        throw new NotFoundException('Product niet gevonden');
      }

      const shoppingCart = await this.prisma.shoppingCart.findUnique({
        where: {
          userUuid: uuid,
        },
      });

      if (!shoppingCart) {
        return await this.prisma.shoppingCart.create({
          data: {
            userUuid: uuid,
            productsOnShoppingCart: {
              create: {
                productId: productId,
              },
            },
          },
        });
      }

      const productOnShoppingCart =
        await this.prisma.productOnShoppingCart.findFirst({
          where: {
            productId: productId,
            shoppingCartId: shoppingCart.uuid,
          },
        });

      if (productOnShoppingCart) {
        return await this.prisma.shoppingCart.update({
          where: {
            userUuid: uuid,
          },
          data: {
            productsOnShoppingCart: {
              update: {
                where: {
                  uuid: productOnShoppingCart.uuid,
                },
                data: {
                  quantity: {
                    increment: 1,
                  },
                },
              },
            },
          },
          include: {
            productsOnShoppingCart: true,
          },
        });
      }

      return await this.prisma.shoppingCart.update({
        where: {
          userUuid: uuid,
        },
        data: {
          productsOnShoppingCart: {
            create: {
              productId: productId,
            },
          },
        },
        include: {
          productsOnShoppingCart: true,
        },
      });
    } catch (e) {
      Logger.error(e);
    }
  }

  async removeProductFromShoppingCart(uuid: string, productId: string) {
    try {
      const kuinProduct = await this.productService.getKuinProduct(productId);

      if (!kuinProduct) {
        throw new NotFoundException('Product niet gevonden');
      }

      const shoppingCart = await this.prisma.shoppingCart.findUnique({
        where: {
          userUuid: uuid,
        },
        include: {
          productsOnShoppingCart: true,
        },
      });

      if (!shoppingCart) {
        throw new NotFoundException('Shopping cart not found');
      }
      const product = shoppingCart.productsOnShoppingCart.find(
        (product) => product.productId === productId,
      );

      if (product) {
        if (product.quantity <= 1) {
          await this.prisma.productOnShoppingCart.delete({
            where: {
              uuid: product.uuid,
            },
          });

          return shoppingCart;
        }

        await this.prisma.productOnShoppingCart.update({
          where: {
            uuid: product.uuid,
          },
          data: {
            quantity: {
              decrement: 1,
            },
          },
        });
        return shoppingCart;
      }

      throw new NotFoundException('Product not found');
    } catch (e) {
      Logger.error(e);
      if (e.status === 404) {
        throw new NotFoundException(e.message);
      } else {
        throw new BadRequestException(e.message);
      }
    }
  }
}
