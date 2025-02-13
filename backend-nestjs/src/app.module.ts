import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProductSchema} from './entity/productEntity';
import {ProductRepository} from './repository/productRepository';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI'),
            }),
        }),
        MongooseModule.forFeature([{ name: 'ProductEntity', schema: ProductSchema }]),
    ],
    controllers: [AppController],
    providers: [AppService, ProductRepository],
})
export class AppModule {}
