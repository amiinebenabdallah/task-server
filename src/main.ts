import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response } from 'express';

function matchOrigin(origin: string, pattern: string): boolean {
  if (pattern.includes('*')) {
    const regex = new RegExp('^' + pattern.replace('.', '\\.').replace('*', '.*') + '$');
    return regex.test(origin);
  }
  return origin === pattern;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api', {
    exclude: ['health']
  });

  const allowedOrigins = [
    'http://localhost:3001',
    'https://task-client-mu.vercel.app',
    'https://task-client.vercel.app',
    'https://task-client-*.vercel.app'
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); 

      const isAllowed = allowedOrigins.some(pattern => matchOrigin(origin, pattern));
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'Origin', 'X-Requested-With'],
    exposedHeaders: ['Authorization'],
    maxAge: 3600
  });


  app.use('/health', (req: Request, res: Response) => {
    res.json({ 
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    });
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
}

export default bootstrap();
