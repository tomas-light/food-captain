import type { IngredientDto } from '../dto/IngredientDto';
import { ApiBaseClient, ContentType } from './ApiBaseClient';

export class IngredientApiClient extends ApiBaseClient {
  getIngredients = async () => {
    return this.request<IngredientDto[]>({
      method: 'GET',
      url: '/ingredients',
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  getIngredientsByIds = async (ingredientIds: IngredientDto['id'][]) => {
    return this.request<IngredientDto[]>({
      method: 'GET',
      url: '/ingredients',
      query: { ingredient_ids: ingredientIds },
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  getIngredientById = async (ingredientId: IngredientDto['id']) => {
    return this.request<IngredientDto>({
      method: 'GET',
      url: `/ingredient/${ingredientId}`,
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  addIngredient = async (ingredient: { name: string; image_id?: number }) => {
    return this.request<IngredientDto>({
      method: 'POST',
      url: '/ingredient',
      data: JSON.stringify(ingredient),
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  updateIngredient = async (ingredient: {
    id: IngredientDto['id'];
    name: string;
    image_id?: number;
  }) => {
    return this.request<IngredientDto>({
      method: 'PUT',
      url: `/ingredient/${ingredient.id}`,
      data: JSON.stringify(ingredient),
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  deleteIngredient = async (ingredientId: IngredientDto['id']) => {
    return this.request<IngredientDto>({
      method: 'DELETE',
      url: `/ingredient/${ingredientId}`,
      type: ContentType.Json,
      responseType: 'json',
    });
  };
}
