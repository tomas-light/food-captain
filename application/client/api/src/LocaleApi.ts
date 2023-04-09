import { metadata } from '@food-captain/client-utils';
import { ApiBase } from './base/ApiBase';

@metadata
export class LocaleApi extends ApiBase {
  async getButtonsAsync(locale: string) {
    return this.get<object>(`/locale/buttons/${locale}`);
  }
}
