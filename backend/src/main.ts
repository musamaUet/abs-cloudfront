import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 4005;

const resolveAppMiddlewares = (app: INestApplication) => {
  app.use(cookieParser());
  app.enableCors({
    origin: ['https://live-medialive.arkeosai.com'], // your deployed React frontend domain
    credentials: true, // allows frontend to receive cookies from backend
  });
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  resolveAppMiddlewares(app);
  await app.listen(PORT);
}
bootstrap();
