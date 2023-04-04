import { Logger, metadata } from '@food-captain/server-utils';
import { Request, Response } from 'express';
import { MvcController } from 'mvc-middleware';

type UrlToMethodMap = {
  [url: string]: keyof CheckApiController;
};

@metadata
export default class CheckApiController extends MvcController {
  constructor(
    protected readonly logger: Logger,
    request: Request,
    response: Response
  ) {
    super(request, response);

    const message = `${request.method.toUpperCase()}: ${request.url}`;
    this.logger.info(message);
  }

  static get: UrlToMethodMap = {
    check: 'check',
  };
  static post: UrlToMethodMap = {
    createUser: 'createUser',
  };

  async check() {
    return this.noContent();
  }

  async createUser(payload: { username: string }) {
    const { username } = payload;
    return this.ok(username);
  }
}
