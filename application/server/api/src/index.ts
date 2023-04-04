import http from 'http';
import path from 'path';
import { registerDatabase } from '@food-captain/database';
import { Logger } from '@food-captain/server-utils';
import { json } from 'body-parser';
import { container } from 'cheap-di';
import cookieParser from 'cookie-parser';
import express, { RequestHandler, Router } from 'express';
import { MvcMiddleware } from 'mvc-middleware';
import CheckApiController from './controllers/CheckApiController';
import {
  POSTGRES_CONNECTION_STRING,
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from './environment';
import { ConsoleLogger } from './utils/ConsoleLogger';

(async () => {
  container.registerType(ConsoleLogger).as(Logger);
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
    host: POSTGRES_HOST,
    port: POSTGRES_PORT ? parseInt(POSTGRES_PORT, 10) : undefined,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE,
    connectionString: POSTGRES_CONNECTION_STRING,
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
