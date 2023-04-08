import http from 'http';
import { Express } from 'express';
import { HOST_HOST, HOST_PORT } from './environment';

interface BaseServerStrategy {
  createAndRunServer: () => void;
}

export interface ServerStrategy extends BaseServerStrategy {
  handleSpaRoutes: () => void;
  handleStaticFiles: () => void;
  sayHi: () => void;
  waitInitialization: () => Promise<void>;
}

export abstract class BaseServer implements BaseServerStrategy {
  protected startMessage: string | undefined;

  constructor(protected app: Express) {}

  createAndRunServer = () => {
    const server = http.createServer(this.app);

    const host = HOST_HOST ?? '0.0.0.0';
    const port = HOST_PORT ? parseInt(HOST_PORT, 10) : 80;

    return new Promise<void>((resolve) => {
      server.listen(port, host, () => {
        if (this.startMessage) {
          console.log(this.startMessage);
        } else {
          console.log(`Host http://${host}:${port}`);
        }
        resolve();
      });
    });
  };
}
