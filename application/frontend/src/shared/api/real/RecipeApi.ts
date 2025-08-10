import type { IngredientDto } from '../dto/IngredientDto';
import type { NewRecipeDto } from '../dto/NewRecipeDto';
import type { RecipeDto } from '../dto/RecipeDto';
import type { TagDto } from '../dto/TagDto';
import { ApiBase, ContentType } from './ApiBase';

interface RecipeFilters {
  tagIds?: TagDto['id'][];
  includedIngredientIds?: IngredientDto['id'][];
  excludedIngredientIds?: IngredientDto['id'][];
  kcalLimit?: RecipeDto['kcal'];
  cookingTimeLimit?: RecipeDto['cooking_time_in_minutes'];
}

export class RecipeApi extends ApiBase {
  getRecipes = async (filters?: RecipeFilters) => {
    return this.request<RecipeDto[]>({
      method: 'GET',
      url: '/recipes',
      query: filters,
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  getRandomRecipe = async (filters?: RecipeFilters) => {
    return this.request<RecipeDto[]>({
      method: 'GET',
      url: '/recipe/random',
      query: filters,
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  getRecipesByIds = async (recipeIds: RecipeDto['id'][]) => {
    return this.request<RecipeDto[]>({
      method: 'GET',
      url: '/recipes',
      query: { recipe_ids: recipeIds },
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  getRecipeById = async (recipeId: RecipeDto['id']) => {
    return this.request<RecipeDto>({
      method: 'GET',
      url: `/recipe/${recipeId}`,
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  addRecipe = async (newRecipe: NewRecipeDto) => {
    return this.request<RecipeDto>({
      method: 'POST',
      url: '/recipe',
      data: JSON.stringify(newRecipe),
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  updateRecipe = async (recipe: {
    id: RecipeDto['id'];
    name?: string;
    order_number?: number;
  }) => {
    return this.request<RecipeDto>({
      method: 'PUT',
      url: `/recipe/${recipe.id}`,
      data: JSON.stringify(recipe),
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  deleteRecipe = async (recipeId: RecipeDto['id']) => {
    return this.request<RecipeDto>({
      method: 'DELETE',
      url: `/recipe/${recipeId}`,
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  getRecipesMaxKcal = async () => {
    return this.request<{ maxKcal: number }>({
      method: 'GET',
      url: '/recipes/max-kcal',
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  getRecipesMaxCookingTime = async () => {
    return this.request<{ maxCookingTime: number }>({
      method: 'GET',
      url: '/recipes/max-cooking-time',
      type: ContentType.Json,
      responseType: 'json',
    });
  };
}
