import http from 'http';
import path from 'path';
import bodyParser, { json } from 'body-parser';
import cors from 'cors';
import { container } from 'cheap-di';
import cookieParser from 'cookie-parser';
import express, { RequestHandler } from 'express';
import { MvcMiddleware } from 'mvc-middleware';
import { Logger } from '@food-captain/server-utils';
import { registerDatabase } from '@food-captain/database';
import {
  API_HOST,
  API_PORT,
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

  const app = express();

  app.use(
    cors({
      origin: 'https://food-captain.localhost',
    })
  );
  // app.use(bodyParser.raw({ type: 'multipart/form-data', limit: '12mb' }));

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

  new MvcMiddleware(app, container).registerControllers(controllersPath);

  const server = http.createServer(app);

  const host = API_HOST ?? 'localhost';
  const port = API_PORT ? parseInt(API_PORT, 10) : 3000;

  server.listen(port, host, () => {
    console.log('api has started');
  });
})();
