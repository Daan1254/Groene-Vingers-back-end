import {BadRequestException, Injectable, Logger, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../../database/prisma.service";
import {HttpService} from "@nestjs/axios";
import {KUIN_BASE_URL} from "../../main";
import {OrderKuinProductDto} from "./dto/order-kuin-product.dto";
import {KuinOrderDto} from "./dto/kuin-order.dto";

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

    async orderKuinProduct(products: OrderKuinProductDto[]) {
        let orders: KuinOrderDto[] = []
        try {
            products.map(product => {
                let order = this.httpService.post<KuinOrderDto>(`${KUIN_BASE_URL}/orderItem`,{
                    product_id: product.id,
                    quantity: product.quantity
                },{
                    headers: {
                        Authorization: `Bearer ${process.env.KUIN_API_KEY}`
                    }
                }).subscribe(order => {
                    orders.push(order.data)
                })
            })

            // Update stock
        } catch(e) {
            Logger.error(e)
            throw new BadRequestException('Er is iets fout gegaan bij het bestellen van de producten')
        }
    }
}
