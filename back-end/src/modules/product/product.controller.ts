import {Controller, Get, Param} from '@nestjs/common'
import {ProductService} from "./product.service";


@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Get('')
    public async getProducts() {
        return await this.productService.getProducts()
    }


    @Get('/:id')
    public async getProduct(@Param('id') id: string) {
        return await this.productService.getProduct(id)
    }

}
