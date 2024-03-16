import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as swaggerUi from 'swagger-ui-express';
import { AppModule } from './app.module';
import * as swaggerDocument from './swagger.json';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  await app.listen(process.env.PORT);
}
bootstrap();
