import { Injectable } from '@nestjs/common';
import { ProductDTO } from './dto/productDTO';

@Injectable()
export class AppService {
    processKrakenData(data: ProductDTO[]): { message: string } {
        return { message: `Received ${data.length} items successfully` };
    }
}
