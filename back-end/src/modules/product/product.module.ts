import {Module} from "@nestjs/common";
import {PrismaService} from "../../database/prisma.service";
import {ProductService} from "./product.service";
import {ProductController} from "./product.controller";
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    controllers: [ProductController],
    providers: [PrismaService, ProductService],
    exports: []
})
export class ProductModule {}
