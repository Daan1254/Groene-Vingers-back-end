import {Injectable, Logger, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../../database/prisma.service";

@Injectable()
export class ShoppingCartService {
    constructor(private readonly prisma: PrismaService) {

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

    async addProductToShoppingCart(uuid: string, productUuid: string) {
        try {
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
                                productId: productUuid
                            }
                        }
                    }
                })
            }

            const productOnShoppingCart = await this.prisma.productOnShoppingCart.findFirst({
                where: {
                    productId: productUuid,
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
                            productId: productUuid
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

    async removeProductFromShoppingCart(uuid: string, productUuid: string) {
        try {
            const shoppingCart = await this.prisma.shoppingCart.count({
                where: {
                    userUuid: uuid
                }
            })

            if (shoppingCart === 0) {
                throw new NotFoundException('Shopping cart not found')
            }


            const productOnShoppingCart = await this.prisma.productOnShoppingCart.findFirst({
                where: {
                    productId: productUuid,
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
                                        decrement: 1
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
                            productId: productUuid
                        }
                    }
                },
                include: {
                    productsOnShoppingCart: true
                }
            })
        } catch(e) {
            Logger.error(e)
        }
    }
}
