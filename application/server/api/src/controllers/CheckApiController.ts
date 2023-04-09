import { Logger } from '@food-captain/server-utils';
import { Request, Response } from 'express';
import { api, get, MvcController, post } from 'mvc-middleware';

@api
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

  @get
  async check() {
    return this.noContent();
  }

  @post
  async createUser(payload: { username: string }) {
    const { username } = payload;
    return this.ok(username);
  }
}
