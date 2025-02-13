import { Injectable } from '@nestjs/common';
import { ProductDTO } from './dto/productDTO';
import { ProductRepository } from "./repository/productRepository";

@Injectable()
export class AppService {
    constructor(private readonly repository: ProductRepository) {}

    async processKrakenData(data: ProductDTO[]) {
        try {
            const promises = data.map((product) => {
                return this.repository.create(
                    product.name,
                    product.updated_at,
                    product.prices,
                    product.rate,
                    product.category
                );
            });

            await Promise.all(promises);

            return { message: `Received ${data.length} items successfully` };
        } catch (error) {
            return { message: `ERROR : ${error.message}` };
        }
    }
}
