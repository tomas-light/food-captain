import type { Request, Response } from 'express';
import { api, get } from 'mvc-middleware';
import { Logger } from '@food-captain/server-utils';
import BaseApiController from './BaseApiController';

const LOCALE_REGION_SEPARATOR = '-';
const supportedLocales = ['ru', 'en'];

@api('/locale')
export default class LocaleApiController extends BaseApiController {
  constructor(
    protected readonly logger: Logger,
    request: Request,
    response: Response
  ) {
    super(logger, request, response);
  }

  @get(':localeOrLocaleWithRegion/:resource')
  getLocaleResource(localeOrLocaleWithRegion: string, resource: string) {
    const locale = this.getLocale(localeOrLocaleWithRegion);

    if (!supportedLocales.includes(locale)) {
      return this.localeIsNotSupported(locale);
    }

    const buttons = require(`../locales/${locale}/${resource}.json`);
    return this.ok(buttons);
  }

  private getLocale(locale: string) {
    if (locale.includes(LOCALE_REGION_SEPARATOR)) {
      [locale] = locale.split(LOCALE_REGION_SEPARATOR);
    }
    return locale;
  }

  private localeIsNotSupported(locale: string) {
    const message = `${locale} is not supported locale`;
    this.logger.warning(message);
    return this.badRequest(message);
  }
}
