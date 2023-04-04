import {Module} from "@nestjs/common";
import {CategoryController} from "./category.controller";
import {PrismaService} from "../../database/prisma.service";
import {CategoryService} from "./category.service";
import {ProductModule} from "../product/product.module";

@Module({
    imports: [ProductModule],
    controllers: [CategoryController],
    providers: [PrismaService, CategoryService],
    exports: []
})
export class CategoryModule {}
