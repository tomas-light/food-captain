import { Express } from 'express';
import { ServerStrategy } from './ServerStrategy';

export class ServerFactory {
  readonly variant: 'development' | 'production' | 'local production';
  server!: ServerStrategy;

  constructor(app: Express) {
    // webpack will not include this code in prod because of tree shaking
    if (process.env.NODE_ENV === 'development') {
      this.variant = 'development';

      const { DevelopmentServer } = require('./DevelopmentServer');
      this.server = new DevelopmentServer(app);
    } else {
      this.variant = 'production';

      const { ProductionServer } = require('./ProductionServer');
      this.server = new ProductionServer(app);
    }
  }
}
