import { ApiBase } from './base/ApiBase';

export type LocaleResource =
  | 'navigation'
  | 'buttons'
  | 'common'
  | 'dimension'
  | 'ingredient'
  | 'menu'
  | 'recipe';

export class LocaleApi extends ApiBase {
  async getAsync(locale: string, resource: LocaleResource) {
    return this.get<object>(`/locale/${locale}/${resource}`);
  }
}
