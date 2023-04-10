import type { Request, Response } from 'express';
import { MvcController } from 'mvc-middleware';
import { Logger } from '@food-captain/server-utils';

export default class BaseApiController extends MvcController {
  constructor(
    protected readonly logger: Logger,
    request: Request,
    response: Response
  ) {
    super(request, response);

    if (new.target === BaseApiController) {
      throw new TypeError(
        'Cannot construct BaseApiController instances directly'
      );
    }

    const message = `${request.method.toUpperCase()}: ${request.url}`;
    this.logger.info(message);
  }
}
