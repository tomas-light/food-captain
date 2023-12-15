import http from 'http';
import path from 'path';
import { json } from 'body-parser';
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
  HOST_HOST,
  HOST_PORT,
} from './environment';
import { ConsoleLogger } from './utils/ConsoleLogger';

(async () => {
  container.registerImplementation(ConsoleLogger).as(Logger);

  const app = express();

  const allowedOrigins = [`https://${HOST_HOST}`];
  if (HOST_PORT) {
    allowedOrigins.push(`https://${HOST_HOST}:${HOST_PORT}`);
  }

  app.use(
    cors({
      origin: function (origin, callback) {
        if (origin && allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`${origin} not allowed by CORS`));
        }
      },
    })
  );
  // app.use(bodyParser.raw({ type: 'multipart/form-data', limit: '12mb' }));

  app.use(json({ limit: '50mb' }) as RequestHandler);
  app.use(cookieParser());
  app.use((request, response, next) => {
    if (
      request.headers.origin &&
      allowedOrigins.includes(request.headers.origin)
    ) {
      response.setHeader('Access-Control-Allow-Origin', request.headers.origin);
    }
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
  const port = API_PORT ? parseInt(API_PORT, 10) : 80;

  server.listen(port, host, () => {
    console.log('api has started');
  });
})();
