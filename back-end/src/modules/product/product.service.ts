import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../database/prisma.service";
import {HttpService} from "@nestjs/axios";
import {KUIN_BASE_URL} from "../../main";

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService, private readonly httpService: HttpService) {
    }


    async getProducts() {
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

    async getProduct(id) {
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
}
