import {Injectable, Logger, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../../database/prisma.service";
import {HttpService} from "@nestjs/axios";
import {KUIN_BASE_URL} from "../../main";

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService, private readonly httpService: HttpService) {
    }


    async getKuinProducts() {
        try {
            const response = await this.httpService.get(`${KUIN_BASE_URL}/product`,{
                headers: {
                    Authorization: `Bearer ${process.env.KUIN_API_KEY}`
                }
            }).toPromise()

            return response.data
        } catch(e) {
            console.error(e)
        }
    }

    async getKuinProduct(id) {
        try {
            const response = await this.httpService.get(`${KUIN_BASE_URL}/product/${id}`,{
                headers: {
                    Authorization: `Bearer ${process.env.KUIN_API_KEY}`
                }
            }).toPromise()

            return response.data
        } catch(e) {
            console.error(e)
        }
    }

    async getProducts() {
        try {
            return await this.prisma.product.findMany({
                include: {
                    stock: true
                }
            })
        } catch(e) {
            Logger.error(e)
        }
    }

    async getProduct(uuid: string) {
        try {
            return await this.prisma.product.findUnique({
                where: {
                    uuid
                },
                include: {
                    stock: true
                }
            })
        } catch(e) {
            Logger.error(e)
            throw new NotFoundException('Product niet gevonden')
        }
    }
}
