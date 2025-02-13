import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './entity/productEntity';
import {ProductRepository} from "./repository/productRepository";

dotenv.config();

@Module({
    controllers: [AppController],
    providers: [AppService, ProductRepository],
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017'),
        MongooseModule.forFeature([{ name: 'ProductEntity', schema: ProductSchema }]),
    ],
})
export class AppModule {}
