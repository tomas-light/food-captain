import { getFakeDatabase } from '../../fake-database/getFakeDatabase';
import type { RecipeDto } from '../dto/RecipeDto';
import type { RecipeApiClient } from '../real/RecipeApiClient';
import { fakeResponse } from './fakeResponse';
import { toBase64 } from './utils/toBase64';

export const fakeRecipeApiClient: Partial<RecipeApiClient> = {
  getRecipes: async () => {
    const database = await getFakeDatabase();
    const allRecipes = await database.recipe.getAll();

    const recipes: RecipeDto[] = [];

    const promises = allRecipes.map(async (recipe) => {
      let imageUrl: string | undefined = undefined;

      const image = await database.image.get(recipe.image_id);
      if (image) {
        imageUrl = await toBase64(image.content);
      }

      recipes.push({
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
        formula: recipe.formula,
        kcal: recipe.kcal,
        portion_weight_in_grams: recipe.portion_weight_in_grams,
        cooking_time_in_minutes: recipe.cooking_time_in_minutes,
        image_url: imageUrl,
        tag_ids: recipe.tag_ids ?? [],
      });
    });

    await Promise.all(promises);

    return fakeResponse.ok(recipes);
  },
};
