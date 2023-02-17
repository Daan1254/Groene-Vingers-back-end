import {Module} from "@nestjs/common";
import {PrismaService} from "../../database/prisma.service";
import {OrderController} from "./order.controller";
import {OrderService} from "./order.service";

@Module({
    imports: [],
    controllers: [OrderController],
    providers: [PrismaService, OrderService],
    exports: []
})
export class OrderModule {}
