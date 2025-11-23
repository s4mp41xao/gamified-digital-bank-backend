import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';

const expressApp = express();

const createFunction = async (expressInstance) => {
    const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressInstance),
    );
    app.enableCors();
    await app.init();
};

export default async function (req, res) {
    await createFunction(expressApp);
    expressApp(req, res);
}
