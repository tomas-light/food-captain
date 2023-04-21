import {
  NewRecipeDto,
  RecipeDto,
  RecipeWithIngredientsDto,
  UpdatedRecipeDto,
} from '@food-captain/api/src/controllers/RecipeApiController';
import { ApiBase } from './base/ApiBase';

export class RecipeApi extends ApiBase {
  async getAllAsync() {
    return this.get<RecipeDto[]>('recipes');
  }

  async getByDishIdAsync(dishId: RecipeWithIngredientsDto['dish_id']) {
    return this.get<RecipeWithIngredientsDto[]>(`recipes/${dishId}`);
  }

  async getByIdAsync(recipeId: RecipeDto['id']) {
    return this.get<RecipeDto>(`recipe/${recipeId}`);
  }

  private async getByIdWithIngredientsAsync(
    recipeId: RecipeWithIngredientsDto['id']
  ) {
    return this.get<RecipeWithIngredientsDto>(
      `recipe/${recipeId}/with-ingredients`
    );
  }

  async addAsync(recipe: NewRecipeDto) {
    return this.post<RecipeWithIngredientsDto>('recipe', recipe);
  }

  async updateAsync(recipe: UpdatedRecipeDto) {
    return this.put<UpdatedRecipeDto>(`recipe/${recipe.id}`, recipe);
  }

  async deleteAsync(recipeId: RecipeDto['id']) {
    return this.delete<{ removed: boolean }>(`recipe/${recipeId}`);
  }
}
