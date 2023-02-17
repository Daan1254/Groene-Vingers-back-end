import {Controller, Get, Param, Query} from "@nestjs/common";
import {ProductService} from "./product.service";

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    public async getAllProducts() {
        return await this.productService.getAllProducts()
    }

    @Get(':id')
    public async getProductById(@Param('id') id: number) {
        return await this.productService.getProductById(id)
    }

    @Get('search')
    public async searchProduct(@Query('search') search: string) {
        return await this.productService.searchProduct(search)
    }
}
