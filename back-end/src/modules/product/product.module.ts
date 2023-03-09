import { Module } from "@nestjs/common";
import {ProductController} from "./product.controller";
import {ProductService} from "./product.service";
import {HttpModule} from "@nestjs/axios";
import {PrismaService} from "../../database/prisma.service";

@Module({
    controllers: [ProductController],
    providers: [ProductService, PrismaService],
    imports: [HttpModule],
    exports: []
})
export class ProductModule{}
