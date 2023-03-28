import {BadRequestException, Injectable, Logger} from "@nestjs/common";
import {PrismaService} from "../../database/prisma.service";

@Injectable()
export class CategoryService {

    constructor(private readonly prisma: PrismaService) {}


    async getCategories() {
        try {
            return await this.prisma.category.findMany()
        } catch (e) {
            Logger.error(e)
            throw new BadRequestException('Something went wrong')
        }

    }
}
