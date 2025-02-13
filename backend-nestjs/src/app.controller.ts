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

    @Post('/api/kraken') async postKraken(@Body(new ParseArrayPipe({items: ProductDTO})) productList: ProductDTO[]) {
        console.log("START POST /kraken")
        const result = await this.appService.processKrakenData(productList);
        console.log("END POST : ", result);
        return result;
    }
}
