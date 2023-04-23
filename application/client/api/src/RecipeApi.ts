import {
  NewRecipeDto,
  RecipeDto,
  RecipeForViewDto,
  UpdatedRecipeDto,
} from '@food-captain/api/src/controllers/RecipeApiController';
import { ApiBase } from './base/ApiBase';

export class RecipeApi extends ApiBase {
  async getAllAsync() {
    return this.get<RecipeForViewDto[]>('recipes');
  }

  async getByIdAsync(recipeId: RecipeForViewDto['id']) {
    return this.get<RecipeForViewDto>(`recipe/${recipeId}`);
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
