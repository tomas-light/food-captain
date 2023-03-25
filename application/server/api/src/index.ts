import http from 'http';
import path from 'path';
import { json } from 'body-parser';
import { container } from 'cheap-di';
import cookieParser from 'cookie-parser';
import express, { RequestHandler, Router } from 'express';
import { MvcMiddleware } from 'mvc-middleware';
import { registerDatabase } from '@food-captain/database';
import CheckApiController from './controllers/CheckApiController';
import { CONNECTION_STRING } from './environment';

(async () => {
  container.registerType(CheckApiController);

  const app = express();
  app.use(json({ limit: '50mb' }) as RequestHandler);
  app.use(cookieParser());
  app.use((request, response, next) => {
    response.setHeader(
      'Access-Control-Allow-Origin',
      'https://food-captain.localhost'
    );
    next();
  });

  const controllersPath = path.join(__dirname, 'controllers');

  registerDatabase(container, {
    connectionString: CONNECTION_STRING,
  });

  // todo: improve after mvc-middleware release 2.0.0
  new MvcMiddleware(app as any, Router as any, container)
    .registerControllers(controllersPath)
    .run();

  const server = http.createServer(app);

  const host = 'food-captain.localhost';
  const port = 3001;

  server.listen(port, host, () => {
    console.log('api has started');
  });
})();
