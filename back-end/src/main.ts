import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";


export const KUIN_BASE_URL = process.env.KUIN_API_URL
export const KUIN_API_KEY = process.env.KUIN_API_KEY

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
      .setTitle('Groene Vingers API')
      .setVersion('1.0')
      .addTag('Groene Vingers')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
