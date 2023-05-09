import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategories() {
    try {
      return await this.prisma.category.findMany({
        include: {
          products: true,
        },
      });
    } catch (e) {
      Logger.error(e);
    }
  }
}
