import {Controller, Get, Headers, Query} from '@nestjs/common'
import {ProductService} from "./product.service";


@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Get('')
    public async getProducts(@Query('page') page: number, @Query('limit') limit: number) {
        return await this.productService.getProducts()
    }

}
