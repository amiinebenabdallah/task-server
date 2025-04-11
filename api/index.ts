import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const serverless = require('serverless-http');

const expressApp = express();
const adapter = new ExpressAdapter(expressApp);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, adapter);
  await app.init();
}

bootstrap();

export const handler = serverless(expressApp); 
