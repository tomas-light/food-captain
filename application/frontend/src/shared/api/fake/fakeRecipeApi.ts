import dayjs from 'dayjs';
import { getFakeDatabase } from '../../fake-database/getFakeDatabase';
import type { ImageTableEntity } from '../../fake-database/tables/ImageTable.entity';
import type { RecipeTableEntity } from '../../fake-database/tables/RecipeTable.entity';
import type { RecipeDto } from '../dto/RecipeDto';
import type { RecipeApi } from '../real/RecipeApi';
import { fakeResponse } from './fakeResponse';
import { toBase64 } from './utils/toBase64';

export const fakeRecipeApi: Partial<RecipeApi> = {
  getRecipes: async () => {
    const database = await getFakeDatabase();
    const allRecipes = await database.recipe.getAll();

    const recipes: RecipeDto[] = [];

    const promises = allRecipes.map(async (recipe) => {
      recipes.push(await mapRecipe(recipe));
    });

    await Promise.all(promises);

    return fakeResponse.ok(recipes);
  },

  getRecipeById: async (recipeId) => {
    const database = await getFakeDatabase();
    const recipe = await database.recipe.get(recipeId);
    if (!recipe) {
      return fakeResponse.notFound(`Recipe with ID (${recipeId}) not found`);
    }

    return fakeResponse.ok<RecipeDto>(await mapRecipe(recipe));
  },

  addRecipe: async (newRecipeDto) => {
    const database = await getFakeDatabase();
    const allRecipes = await database.recipe.getAll();
    const maxRecipeId = allRecipes.reduce(
      (id, recipe) => Math.max(id, recipe.id),
      0
    );

    const recipe: RecipeTableEntity = {
      id: maxRecipeId + 1,
      name: newRecipeDto.name,
      image_id: undefined,
      description: newRecipeDto.description,
      formula: newRecipeDto.formula,
      portion_weight_in_grams: newRecipeDto.portion_weight_in_grams,
      cooking_time_in_minutes: newRecipeDto.cooking_time_in_minutes,
      tag_ids: newRecipeDto.tag_ids,
      nutrition: newRecipeDto.nutrition,
      author_id: newRecipeDto.author_id,
      created_at: dayjs().toISOString(),
    };

    if (newRecipeDto.image) {
      const allImages = await database.image.getAll();
      const maxImageId = allImages.reduce(
        (id, recipe) => Math.max(id, recipe.id),
        0
      );

      const image: ImageTableEntity = {
        id: maxImageId + 1,
        content: newRecipeDto.image,
        associated_name: newRecipeDto.name,
      };

      await database.image.insert(image.id, image);
      recipe.image_id = image.id;
    }

    await database.recipe.insert(recipe.id, recipe);

    return fakeResponse.ok<RecipeDto>(await mapRecipe(recipe));
  },
};

async function mapRecipe(recipe: RecipeTableEntity): Promise<RecipeDto> {
  const database = await getFakeDatabase();

  let imageUrl: string | undefined = undefined;

  const image = await database.image.get(recipe.image_id);
  if (image) {
    imageUrl = await toBase64(image.content);
  }

  return {
    id: recipe.id,
    name: recipe.name,
    description: recipe.description,
    formula: recipe.formula,
    portion_weight_in_grams: recipe.portion_weight_in_grams,
    cooking_time_in_minutes: recipe.cooking_time_in_minutes,
    image_url: imageUrl,
    tag_ids: recipe.tag_ids ?? [],
    nutrition: recipe.nutrition,
    author_id: recipe.author_id,
    created_at: recipe.created_at,
  };
}
