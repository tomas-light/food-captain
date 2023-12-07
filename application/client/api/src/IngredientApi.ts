import { IngredientDto, NewIngredientDto } from '@food-captain/api';
import { ApiBase } from './base/ApiBase';

export class IngredientApi extends ApiBase {
  async getAllAsync() {
    return this.get<IngredientDto[]>('/ingredients');
  }

  async getManyAsync(ingredientIds: IngredientDto['id'][]) {
    return this.post<IngredientDto[]>('/ingredients-by-ids', ingredientIds);
  }

  async getByIdAsync(ingredientId: IngredientDto['id']) {
    return this.get<IngredientDto>(`ingredient/${ingredientId}`);
  }

  async getByRecipeIdAsync(recipeId: number) {
    return this.get<IngredientDto[]>(`ingredients/recipe/${recipeId}`);
  }

  async addAsync(ingredient: NewIngredientDto) {
    return this.post<IngredientDto>('ingredient', ingredient);
  }

  async updateAsync(ingredient: IngredientDto) {
    return this.put<IngredientDto>(`ingredient/${ingredient.id}`, ingredient);
  }

  async deleteAsync(ingredientId: IngredientDto['id']) {
    return this.delete<{ removed: boolean }>(`ingredient/${ingredientId}`);
  }
}
