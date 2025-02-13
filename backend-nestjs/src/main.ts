import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: 'http://localhost:4200',
        methods: 'POST,OPTIONS',
        allowedHeaders: 'Content-Type, Authorization',
        credentials: true,
    });
    const port = process.env.PORT || 3000;
    console.log(`Server running on port ${port}`);

    await app.listen(port);
}

bootstrap();