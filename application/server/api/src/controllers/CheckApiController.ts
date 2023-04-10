import { Request, Response } from 'express';
import { api, get, post } from 'mvc-middleware';
import { Logger } from '@food-captain/server-utils';
import BaseApiController from './BaseApiController';

@api
export default class CheckApiController extends BaseApiController {
  constructor(
    protected readonly logger: Logger,
    request: Request,
    response: Response
  ) {
    super(logger, request, response);
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
