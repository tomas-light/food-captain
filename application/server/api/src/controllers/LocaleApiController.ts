import { Database } from '@food-captain/database';
import { UserWithRoleEntity } from '@food-captain/database/src/tables';
import { Logger } from '@food-captain/server-utils';
import type { Request, Response } from 'express';
import { MvcController, get, api } from 'mvc-middleware';

const supportedLocales = ['ru'];

@api('/locale')
export default class LocaleApiController extends MvcController {
  constructor(
    protected readonly logger: Logger,
    private readonly db: Database,
    request: Request,
    response: Response
  ) {
    super(request, response);

    const message = `${request.method.toUpperCase()}: ${request.url}`;
    this.logger.info(message);
  }

  @get('buttons/:locale')
  async getButtonsAsync(locale: string) {
    if (!supportedLocales.includes(locale)) {
      const message = `${locale} is not supported locale`;
      this.logger.warning(message);
      return this.badRequest(message);
    }

    const buttons = require(`../locales/${locale}/buttons.json`);
    return this.ok(buttons);
  }
}

export interface UserWithRoleDto extends UserWithRoleEntity {}
