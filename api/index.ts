import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

const express = require('express');
const serverless = require('serverless-http');

const expressApp = express();
const adapter = new ExpressAdapter(expressApp);

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, adapter);
    await app.init();
  } catch (err) {
    console.error('NestJS bootstrap error:', err); 
  }
}

bootstrap();

export default serverless(expressApp);
