import {Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/order')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':uuid')
  getHello(@Param('uuid') uuid: string): string{
    return this.appService.getHello()
  }
}
