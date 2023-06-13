import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserDto } from '../auth/dto/user.dto';
import { HttpService } from '@nestjs/axios';
import { KUIN_BASE_URL } from '../../main';
import * as process from 'process';
import { KuinOrderDto } from '../product/dto/kuin-order.dto';
import { Order, Status } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  public async refreshKuinOrders() {
    try {
      const response = await this.httpService
        .get<KuinOrderDto[]>(`${KUIN_BASE_URL}/order`, {
          headers: {
            Authorization: `Bearer ${process.env.KUIN_API_KEY}`,
          },
        })
        .toPromise();

      const data = response.data;

      data.map(async (data) => {
        const order = await this.prisma.order
          .findUnique({
            where: {
              orderId: data.id,
            },
          })
          .catch(() => {
            return;
          });

        if (order) {
          if (data.status === 'completed') {
            const order = await this.prisma.order.update({
              where: {
                orderId: data.id,
              },
              data: {
                status: Status.COMPLETED,
              },
            });
            await this.updateStock(order);
          }
        }
      });
    } catch (e) {
      Logger.error(e);
    }
  }

  private async updateStock(order: Order) {
    const existingProduct = await this.prisma.product.findFirst({
      where: {
        kuinId: order.kuinId,
      },
      include: {
        stock: true,
      },
    });

    if (!existingProduct) {
      return;
    }

    await this.prisma.stock.update({
      where: {
        productUuid: existingProduct.uuid,
      },
      data: {
        quantity: {
          increment: order.quantity,
        },
      },
    });
  }

  public async createOrder(body: CreateOrderDto, user: UserDto) {
    try {
      return await this.prisma.order.create({
        data: {
          product: {
            connect: {
              uuid: body.productUuid ?? null,
            },
          },
          kuinId: body.kuinId ?? null,
          user: {
            connect: {
              uuid: user.uuid,
            },
          },
          orderId: body.orderId,
          quantity: body.quantity,
          price: 200
        },
        include: {
          product: true,
        },
      });
    } catch (e) {
      Logger.error(e);
    }
  }

  async getOrders() {
    await this.refreshKuinOrders();
    try {
      return await this.prisma.order.findMany({
        where: {
          kuinId: {
            not: null,
          },
          orderId: {
            not: null,
          },
        },
        include: {
          product: true,
        },
      });
    } catch (e) {
      Logger.error(e);
    }
  }
}