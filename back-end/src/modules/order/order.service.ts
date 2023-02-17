import {PrismaService} from "../../database/prisma.service";

export class OrderService {
    constructor(private readonly prisma: PrismaService) {}
}
