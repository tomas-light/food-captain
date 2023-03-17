import http from 'http';
import { Express } from 'express';

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

    // const host = '0.0.0.0';
    const host = 'food-captain.localhost';
    const port = 3000;

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
