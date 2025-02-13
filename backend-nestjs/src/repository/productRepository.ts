import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {ProductEntity} from "../entity/productEntity";

@Injectable()
export class ProductRepository {
    constructor(@InjectModel('ProductEntity') private readonly productModel: Model<ProductEntity>) {}

    async create(name: string, updated_at: string, prices: number[], rate: number, category: string, ): Promise<ProductEntity> {
        const createdProduct = new this.productModel({ name, updated_at, prices, rate, category});
        return createdProduct.save();
    }
}
