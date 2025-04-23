import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // HABILITA CORS para o frontend acessar
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  // Aumenta o limite do body para 10mb (base64 é pesado)
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  await app.listen(3000);
}
bootstrap();
