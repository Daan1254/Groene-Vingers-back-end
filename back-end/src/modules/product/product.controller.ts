import {Controller, Get, Param, UseGuards} from '@nestjs/common'
import {ProductService} from "./product.service";
import {ApiHeaders, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "../auth/auth.guard";

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Get('kuin')
    @UseGuards(AuthGuard)
    @ApiHeaders([{name: 'auth-token', description: 'Groene vingers API token'}])
    public async getKuinProducts() {
        return await this.productService.getKuinProducts()
    }


    @Get('kuin/:id')
    @UseGuards(AuthGuard)
    @ApiHeaders([{name: 'auth-token', description: 'Groene vingers API token'}])
    public async getKuinProduct(@Param('id') id: string) {
        return await this.productService.getKuinProduct(id)
    }


    @Get('')
    async getProducts() {
        return this.productService.getProducts()
    }

    @Get(':uuid')
    async getProduct(@Param('uuid') uuid: string) {
        return await this.productService.getProduct(uuid)
    }

}
