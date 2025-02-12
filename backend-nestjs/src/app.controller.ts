import {
    Controller,
    Post,
    Body,
    ParseArrayPipe
} from '@nestjs/common';
import {AppService} from './app.service';
import {ProductDTO} from "./dto/productDTO";


@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post('/api/kraken')
    postKraken(@Body(new ParseArrayPipe({items: ProductDTO})) productList: ProductDTO[]): { message: string } {
        console.log("START POST /kraken")
        return this.appService.processKrakenData(productList);
    }
}
