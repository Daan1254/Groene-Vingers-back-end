import {BadRequestException, Injectable, Logger} from "@nestjs/common";
import {PrismaService} from "../../database/prisma.service";

@Injectable()
export class CategoryService {

    constructor(private readonly prisma: PrismaService) {}


}