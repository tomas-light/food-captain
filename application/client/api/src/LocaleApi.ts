import { metadata } from '@food-captain/client-utils';
import { ApiBase } from './base/ApiBase';

@metadata
export class LocaleApi extends ApiBase {
  async getButtonsAsync(locale: string) {
    return this.get<object>(`/locale/buttons/${locale}`);
  }
  async getCommonAsync(locale: string) {
    return this.get<object>(`/locale/buttons/${locale}`);
  }
  async getDimensionAsync(locale: string) {
    return this.get<object>(`/locale/common/${locale}`);
  }
  async getDishAsync(locale: string) {
    return this.get<object>(`/locale/dimension/${locale}`);
  }
  async getIngredientAsync(locale: string) {
    return this.get<object>(`/locale/dish/${locale}`);
  }
  async getMenuAsync(locale: string) {
    return this.get<object>(`/locale/ingredient/${locale}`);
  }
  async getRecipeAsync(locale: string) {
    return this.get<object>(`/locale/menu/${locale}`);
  }
}
