import { join } from 'path';
import express, { Response } from 'express';
import { BaseServer, ServerStrategy } from './ServerStrategy';

// path relative to 'dist' location
const distPath = join(__dirname, '..');
const staticPath = join(distPath, 'client');
const pathToView = join(staticPath, 'index.html');

export class ProductionServer extends BaseServer implements ServerStrategy {
  async waitInitialization() {}

  handleSpaRoutes = () => {
    try {
      this.sendHtmlForRoute('/*');
    } catch (error) {
      console.error(error);
    }
  };

  private setHeaders(response: Response) {
    response.setHeader('Content-Security-Policy', "default-src 'self'");
    response.setHeader('Referrer-Policy', 'no-referrer');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Strict-Transport-Security', 'max-age=31536000');
  }

  private sendHtmlForRoute(route: string) {
    this.app.get(route, (request, response) => {
      console.log('[handleSpaRoutes] request', request.url);
      console.log(
        '[handleSpaRoutes] response',
        response?.statusCode,
        response?.statusMessage
      );

      this.setHeaders(response);

      response.sendFile(pathToView, (error) => {
        if (error) {
          console.error('[handleSpaRoutes] sendFile error', error);
        }
      });
    });
  }

  handleStaticFiles = () => {
    this.app.use(express.static(staticPath));
  };

  sayHi = () => {
    console.log('production server');
  };
}
