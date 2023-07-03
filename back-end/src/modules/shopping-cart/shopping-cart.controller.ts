import {Controller, Delete, Get, Param, Post, Req, UseGuards} from "@nestjs/common";
import { ShoppingCartService } from "./shopping-cart.service";
import {AuthGuard, RequestWithAuth} from "../auth/auth.guard";
import {ApiHeaders, ApiParam, ApiTags} from "@nestjs/swagger";
@ApiTags('shopping-cart')
@Controller('shopping-cart')
export class ShoppingCartController {
    constructor(private readonly shoppingCartService: ShoppingCartService) {}

    @Get('')
    @UseGuards(AuthGuard)
    @ApiHeaders([{name: 'auth-token', description: 'Groene vingers API token'}])
    public async getShoppingCartFromUser(@Req() req: RequestWithAuth) {
        return await this.shoppingCartService.getShoppingCartFromUser(req.user.uuid)
    }

    @Post(':productId')
    @UseGuards(AuthGuard)
    @ApiHeaders([{name: 'auth-token', description: 'Groene vingers API token'}])
    public async addProductToShoppingCart(@Req() req: RequestWithAuth, @Param('productId') productId: string) {
        return await this.shoppingCartService.addProductToShoppingCart(req.user.uuid, productId)
    }

    @Post('order')
    @ApiParam({name: 'price', description: 'Amount (price)'})
    async chargeCustomer(@Param('price') price: number) {
        return this.shoppingCartService.createPayment(price);
    }

    @Delete('remove/:productId')
    @UseGuards(AuthGuard)
    @ApiHeaders([{name: 'auth-token', description: 'Groene vingers API token'}])
    @ApiParam({name: 'productId', description: 'Product UUID'})
    public async removeProductFromShoppingCart(@Req() req: RequestWithAuth, @Param('productId') productId: string) {
        return await this.shoppingCartService.removeProductFromShoppingCart(req.user.uuid, productId)
    }

}
