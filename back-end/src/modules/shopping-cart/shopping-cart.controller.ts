import {Controller, Get, Req, UseGuards} from "@nestjs/common";
import { ShoppingCartService } from "./shopping-cart.service";
import {AuthGuard, RequestWithAuth} from "../auth/auth.guard";

@Controller('shopping-cart')
export class ShoppingCartController {
    constructor(private readonly shoppingCartService: ShoppingCartService) {}

    @Get('')
    @UseGuards(AuthGuard)
    public async getShoppingCartFromUser(@Req() req: RequestWithAuth) {
        return await this.shoppingCartService.getShoppingCartFromUser(req.user.uuid)
    }

    @Get(':productUuid')
    @UseGuards(AuthGuard)
    public async addProductToShoppingCart(@Req() req: RequestWithAuth) {
        return await this.shoppingCartService.addProductToShoppingCart(req.user.uuid, req.params.productUuid)
    }

    @Get('remove/:productUuid')
    @UseGuards(AuthGuard)
    public async removeProductFromShoppingCart(@Req() req: RequestWithAuth) {
        return await this.shoppingCartService.removeProductFromShoppingCart(req.user.uuid, req.params.productUuid)
    }

}
