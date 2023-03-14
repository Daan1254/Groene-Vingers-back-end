import {Module} from "@nestjs/common";
import {PrismaService} from "../../database/prisma.service";
import {ShoppingCartService} from "./shopping-cart.service";
import {ShoppingCartController} from "./shopping-cart.controller";
import {ProductModule} from "../product/product.module";

@Module({
    controllers: [ShoppingCartController],
    providers: [ShoppingCartService, PrismaService],
    imports: [ProductModule],
})
export class ShoppingCartModule {}
