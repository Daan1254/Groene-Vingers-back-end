import { PrismaService } from '../../database/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { CreateEditCategoryDto } from './dto/create-edit-category.dto';

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

  async createCategory(body: CreateEditCategoryDto) {
    try {
      return await this.prisma.category.create({
        data: {
          name: body.name,
          description: body.description,
          thumbnailUrl: body.thumbnailUrl,
        },
      });
    } catch (e) {
      Logger.error(e);
    }
  }
}
