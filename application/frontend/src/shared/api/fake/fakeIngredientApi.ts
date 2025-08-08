import { getFakeDatabase } from '../../fake-database/getFakeDatabase';
import type { IngredientDto } from '../dto/IngredientDto';
import type { IngredientApi } from '../real/IngredientApi';
import { fakeResponse } from './fakeResponse';
import { toBase64 } from './utils/toBase64';

export const fakeIngredientApi: Partial<IngredientApi> = {
  getIngredients: async () => {
    const database = await getFakeDatabase();
    const allIngredients = await database.ingredient.getAll();

    const ingredients: IngredientDto[] = [];

    const promises = allIngredients.map(async (ingredient) => {
      let imageUrl: string | undefined = undefined;

      const image = await database.image.get(ingredient.image_id);
      if (image) {
        imageUrl = await toBase64(image.content);
      }

      ingredients.push({
        id: ingredient.id,
        name: ingredient.name,
        image_url: imageUrl,
      });
    });

    await Promise.all(promises);

    return fakeResponse.ok(ingredients);
  },
};
