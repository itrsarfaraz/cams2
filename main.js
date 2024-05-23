"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const validation_exception_filter_1 = require("./exception/validation-exception.filter");
const express = require("express");
const path_1 = require("path");
async function bootstrap() {
    const server = express();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Authorization,Custom-Header,Organization_id,userModuleRole',
    });
    app.setGlobalPrefix('api');
    app.use('/api/images', express.static((0, path_1.join)(__dirname, 'public', 'upload')));
    app.use('/api/public/', express.static((0, path_1.join)(__dirname, 'public')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        stopAtFirstError: true,
        skipMissingProperties: false,
        skipNullProperties: true,
        exceptionFactory: validation_exception_filter_1.ValidationFilter,
    }));
    const config = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle('cams2')
        .setDescription('The cams2 API')
        .setVersion('1.0')
        .addTag('cams2')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/api/swagger', app, document, {
        customSiteTitle: 'cams2',
    });
    await app.listen(process.env.Port || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map