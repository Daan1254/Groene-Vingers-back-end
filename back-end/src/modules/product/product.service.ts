import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { HttpService } from '@nestjs/axios';
import { KUIN_BASE_URL } from '../../main';
import { CreateProductDto } from './dto/create-product.dto';
import { KuinOrderDto } from './dto/kuin-order.dto';
import { catchError } from 'rxjs';
import { ProductDto } from './dto/product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
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

  async orderKuinProduct(product: CreateProductDto) {
    console.log(product.kuinId, product.quantity);
    try {
      const order = await this.httpService
        .post<KuinOrderDto>(
          `${KUIN_BASE_URL}/orderItem`,
          {
            product_id: product.kuinId,
            quantity: product.quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.KUIN_API_KEY}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .toPromise();

      const newProduct = await this.createProduct(product);
    } catch (e) {
      Logger.error(e);
      throw new UnprocessableEntityException(
        'Er is iets fout gegaan bij het bestellen van de producten',
      );
    }
  }

  private async createProduct(product: CreateProductDto): Promise<Product> {
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
      });
    } catch (e) {
      console.error(e);
    }
  }
}
