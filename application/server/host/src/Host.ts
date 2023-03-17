import compression from 'compression';
import express from 'express';
import { ServerFactory } from './ServerFactory';
import { ServerStrategy } from './ServerStrategy';

const notImplemented = (): any => {
  throw new Error('Not implemented');
};

class Host {
  private static singleton: Host | undefined = undefined;
  server: ServerStrategy = {
    sayHi: notImplemented,
    handleStaticFiles: notImplemented,
    handleSpaRoutes: async () => notImplemented(),
    createAndRunServer: notImplemented,
    waitInitialization: notImplemented,
  };

  constructor() {
    if (!Host.singleton) {
      Host.singleton = this;
    }

    return Host.singleton;
  }

  async start() {
    const app = express();

    this.server = new ServerFactory(app).server;
    if (!this.server) {
      console.error('Server is not created');
      return;
    }
    await this.server.waitInitialization();

    this.server.sayHi();

    app.use(compression());
    this.server.handleStaticFiles();

    await this.server.createAndRunServer();
    this.server.handleSpaRoutes();
  }
}

export { Host };
