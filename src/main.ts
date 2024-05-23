import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ValidationFilter } from './exception/validation-exception.filter';
import * as express from 'express';
import { join } from 'path';
async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization,Custom-Header,Organization_id,userModuleRole',
  });
  app.setGlobalPrefix('api');
  // app.use(express.static(join(__dirname, '../upload/'))); //For Local
  // app.use('/api', express.static(join(__dirname, '/upload'))); //For Live Server file upload
  app.use("/api/public/organization_logos/",express.static(join(__dirname, "..", "public", "organization_logos")),); //For Local
  app.use("/api/public/organization_logos/",express.static(join(__dirname, "public", "organization_logos"))); //For Live Server file upload
  // app.use('/api/public/', express.static(join(__dirname, 'public'))); //For Live Server file upload

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //create swagger ui
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      skipMissingProperties: false,
      skipNullProperties: true,

      exceptionFactory: ValidationFilter,
    }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('cams2')
    .setDescription('The cams2 API')
    .setVersion('1.0')
    .addTag('cams2')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger', app, document, {
    customSiteTitle: 'cams2',
  });

  await app.listen(process.env.Port || 3000);
}
bootstrap();
