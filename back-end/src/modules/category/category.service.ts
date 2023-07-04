import { PrismaService } from '../../database/prisma.service';
import { Injectable, Logger } from '@nestjs/common';

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
