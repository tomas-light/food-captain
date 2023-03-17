import historyApiFallback from 'connect-history-api-fallback';
import { Express } from 'express';
import webpack, { Configuration } from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import { makeDevConfig } from './webpack/config.dev';
import { BaseServer, ServerStrategy } from './ServerStrategy';

export class DevelopmentServer extends BaseServer implements ServerStrategy {
  protected startMessage = 'https://food-captain.localhost/';

  constructor(app: Express) {
    super(app);
  }

  async waitInitialization() {
    console.log('start promise');
    const devConfig = await makeDevConfig();
    this.webpackDevConfig = devConfig;
  }

  private webpackDevConfig: Configuration | undefined;

  handleSpaRoutes = () => {
    if (!this.webpackDevConfig) {
      console.error('Webpack dev config is not loaded');
      return;
    }

    const compiler = webpack(this.webpackDevConfig);
    const middleware = webpackMiddleware(compiler, {
      publicPath: this.webpackDevConfig.output?.publicPath ?? '/',
    });

    // double using of 'app.use(middleware)' is required for correct rewriting
    this.app.use(middleware);
    this.app.use(
      historyApiFallback({
        rewrites: [{ from: /^\/$/, to: '/index.html' }],
      })
    );
    this.app.use(middleware);

    this.app.use(
      hotMiddleware(
        // type inconsistency between different versions of webpack
        compiler as unknown as Parameters<typeof hotMiddleware>[0],
        {
          log: console.log,
          path: '/__webpack_hmr',
          heartbeat: 10 * 5000,
        }
      )
    );
  };

  handleStaticFiles = () => {
    // no need for dev
  };

  sayHi = () => {
    console.log('dev server');
  };
}
