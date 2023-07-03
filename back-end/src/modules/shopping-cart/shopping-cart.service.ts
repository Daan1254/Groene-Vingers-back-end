import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { ProductService } from "../product/product.service";
import { InjectStripe  } from 'nestjs-stripe';
import Stripe from 'stripe';


@Injectable()
export class ShoppingCartService {
    constructor(
        private readonly prisma: PrismaService, 
        private readonly productService: ProductService,
        @InjectStripe() private readonly stripeClient: Stripe,
      ) {}


      async createPayment(price: number) {
        const session = await this.stripeClient.checkout.sessions.create(
          {
            line_items: [
              {
                price_data: {
                  currency: 'eur',
                  unit_amount: price,
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: 'https://www.youtube.com',
            cancel_url: 'https://www.google.com',
          },
          {
            apiKey: process.env.STRIPE_API_KEY,
          },
        );
    
        return session;
      }

    async getShoppingCartFromUser(uuid: any) {
        try {
            const shoppingCart = await this.prisma.shoppingCart.count()
            if (shoppingCart === 0) {
                return await this.prisma.shoppingCart.create({
                    data: {
                        userUuid: uuid
                    }
                })
            }

            return await this.prisma.shoppingCart.findUnique({
                where: {
                    userUuid: uuid
                },
                include: {
                    productsOnShoppingCart: true
                }
            })
        } catch (e) {
            Logger.error(e)
        }
    }

    async addProductToShoppingCart(uuid: string, productId: string) {
        try {
            const product = await this.productService.getKuinProduct(productId)

            if (!product) {
                throw new NotFoundException('Product niet gevonden')
            }

            const shoppingCart = await this.prisma.shoppingCart.findUnique({
                where: {
                    userUuid: uuid
                }
            })

            if (!shoppingCart) {
                return await this.prisma.shoppingCart.create({
                    data: {
                        userUuid: uuid,
                        productsOnShoppingCart: {
                            create: {
                                productId: productId
                            }
                        }
                    }
                })
            }

            const productOnShoppingCart = await this.prisma.productOnShoppingCart.findFirst({
                where: {
                    productId: productId,
                    shoppingCartId: shoppingCart.uuid
                }
            })

            if (productOnShoppingCart) {
                return await this.prisma.shoppingCart.update({
                    where: {
                        userUuid: uuid
                    },
                    data: {
                        productsOnShoppingCart: {
                            update: {
                                where: {
                                    uuid: productOnShoppingCart.uuid
                                },
                                data: {
                                   quantity: {
                                        increment: 1
                                   }
                                }
                            }
                        }
                    },
                    include: {
                        productsOnShoppingCart: true
                    }
                })
            }

            return await this.prisma.shoppingCart.update({
                where: {
                    userUuid: uuid
                },
                data: {
                    productsOnShoppingCart: {
                        create: {
                            productId: productId
                        }
                    }
                },
                include: {
                    productsOnShoppingCart: true
                }
            })
        } catch (e) {
            Logger.error(e)
        }
    }

    async removeProductFromShoppingCart(uuid: string, productId: string) {
        try {
            const kuinProduct = await this.productService.getKuinProduct(productId)

            if (!kuinProduct) {
                throw new NotFoundException('Product niet gevonden')
            }

            const shoppingCart = await this.prisma.shoppingCart.findUnique({
                where: {
                    userUuid: uuid
                },
                include: {
                    productsOnShoppingCart: true
                }
            })

            if (!shoppingCart) {
                throw new NotFoundException('Shopping cart not found')
            }
            const product = shoppingCart.productsOnShoppingCart.find(product => product.productId === productId)

            if (product) {
                if (product.quantity <= 1) {
                    await this.prisma.productOnShoppingCart.delete({
                        where: {
                            uuid: product.uuid
                        }
                    })

                    return shoppingCart
                }

                await this.prisma.productOnShoppingCart.update({
                    where: {
                        uuid: product.uuid
                    },
                    data: {
                        quantity: {
                            decrement: 1
                        }
                    }
                })
                return shoppingCart
            }

            throw new NotFoundException('Product not found')
        } catch(e) {
            Logger.error(e)
            if (e.status === 404) {
                throw new NotFoundException(e.message)
            } else {
                throw new BadRequestException(e.message)
            }
        }
    }
}
