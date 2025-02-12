import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: 'http://localhost:4200', // Your Angular app's origin
        methods: 'POST,OPTIONS',
        allowedHeaders: 'Content-Type, Authorization',
        credentials: true,
    });
    await app.listen(3000);
}

bootstrap();