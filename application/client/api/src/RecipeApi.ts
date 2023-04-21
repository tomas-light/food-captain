import {
  NewRecipeDto,
  RecipeDto,
  RecipeForViewDto,
  UpdatedRecipeDto,
} from '@food-captain/api/src/controllers/RecipeApiController';
import { ApiBase } from './base/ApiBase';

export class RecipeApi extends ApiBase {
  async getAllAsync() {
    return this.get<RecipeDto[]>('recipes');
  }

  async getByDishIdAsync(dishId: RecipeForViewDto['dish_id']) {
    return this.get<RecipeForViewDto[]>(`recipes/${dishId}`);
  }

  async getByIdAsync(recipeId: RecipeDto['id']) {
    return this.get<RecipeDto>(`recipe/${recipeId}`);
  }

  private async getByIdWithIngredientsAsync(recipeId: RecipeForViewDto['id']) {
    return this.get<RecipeForViewDto>(`recipe/${recipeId}/with-ingredients`);
  }

  async addAsync(recipe: NewRecipeDto) {
    return this.post<RecipeForViewDto>('recipe', recipe);
  }

  async updateAsync(recipe: UpdatedRecipeDto) {
    return this.put<UpdatedRecipeDto>(`recipe/${recipe.id}`, recipe);
  }

  async deleteAsync(recipeId: RecipeDto['id']) {
    return this.delete<{ removed: boolean }>(`recipe/${recipeId}`);
  }
}
