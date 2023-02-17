import {BadRequestException, Injectable} from "@nestjs/common";
import {PrismaService} from "../../database/prisma.service";
import {HttpService} from "@nestjs/axios";
import {KUIN_API_KEY, KUIN_BASE_URL} from "../../main";
import {catchError, firstValueFrom} from "rxjs";

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService, private readonly httpService: HttpService) {}


    public async getAllProducts(){
        const response = this.httpService.get(`/product`, {
            headers: {
                Authorization: `Bearer ${KUIN_API_KEY}`
            },
            baseURL: KUIN_BASE_URL,
            responseType: 'json',

        })

        const data = await firstValueFrom(response)

        return data.data
    }

    public async getProductById(id: number){
        const response = this.httpService.get(`/product/${id}`, {
            headers: {
                Authorization: `Bearer ${KUIN_API_KEY}`
            },
            baseURL: KUIN_BASE_URL,
            responseType: 'json',

        })

        const data = await firstValueFrom(response)

        return data.data
    }

    public async searchProduct(search: string){
        const response = this.httpService.get(`/product/search/${search}`, {
            headers: {
                Authorization: `Bearer ${KUIN_API_KEY}`
            },
            baseURL: KUIN_BASE_URL,
        }).pipe(catchError (err => {
            throw new BadRequestException(err)
        }))

        const data = await firstValueFrom(response)

        return data.data
    }
}
