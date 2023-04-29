import {
  NewRecipeDto,
  RecipeDto,
  RecipeFiltersDto,
  RecipeForViewDto,
  UpdatedRecipeDto,
} from '@food-captain/api';
import { ApiBase } from './base/ApiBase';

export class RecipeApi extends ApiBase {
  async getAllAsync() {
    return this.get<RecipeForViewDto[]>('recipes');
  }

  async getByIdAsync(recipeId: RecipeForViewDto['id']) {
    return this.get<RecipeForViewDto>(`recipe/${recipeId}`);
  }

  async getRecipesByFilterAsync(filters: RecipeFiltersDto) {
    return this.post<RecipeForViewDto[]>('recipes-by-filter', filters);
  }

  async getRandomRecipeByFilterAsync(filters: RecipeFiltersDto) {
    return this.post<RecipeForViewDto | undefined>(
      'recipes-by-filter/random',
      filters
    );
  }

  async getMaxKcalAsync() {
    return this.get<{ maxKcal: RecipeDto['kcal'] | undefined }>(
      'recipes/max-kcal'
    );
  }

  async getMaxCookingTimeAsync() {
    return this.get<{
      maxCookingTime: RecipeDto['cooking_time_in_minutes'] | undefined;
    }>('recipes/max-cooking-time');
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
