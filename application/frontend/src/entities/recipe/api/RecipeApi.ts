import type { RecipeApiClient } from '~/shared/api';
import type { Recipe } from '../model/Recipe';

export class RecipeApi {
  constructor(private readonly apiClient: RecipeApiClient) {}

  getRecipes = async () => {
    const response = await this.apiClient.getRecipes();
    return response.data?.map(
      (dto): Recipe => ({
        id: dto.id,
        name: dto.name,
        imageUrl: dto.image_url,
        description: dto.description,
        kcal: dto.kcal,
        portionWeightInGrams: dto.portion_weight_in_grams,
        cookingTimeInMinutes: dto.cooking_time_in_minutes,
      })
    );
  };
}
