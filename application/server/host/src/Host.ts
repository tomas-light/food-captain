import compression from 'compression';
import express, { type Express } from 'express';
import { ServerStrategy } from './ServerStrategy';

export class Host {
  private static singleton: Host | undefined = undefined;
  constructor() {
    if (!Host.singleton) {
      Host.singleton = this;
    }
    return Host.singleton;
  }

  async start() {
    const app = express();

    const server = chooseServer(app);
    await server.waitInitialization();

    server.sayHi();

    app.use(compression());
    server.handleStaticFiles();

    await server.createAndRunServer();
    server.handleSpaRoutes();
  }
}

function chooseServer(app: Express): ServerStrategy {
  // webpack will not include this code in prod because of tree shaking
  if (process.env.NODE_ENV === 'development') {
    const { DevelopmentServer } = require('./DevelopmentServer');
    return new DevelopmentServer(app);
  } else {
    const { ProductionServer } = require('./ProductionServer');
    return new ProductionServer(app);
  }
}
