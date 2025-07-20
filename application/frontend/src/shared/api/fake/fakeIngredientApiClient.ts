import { getFakeDatabase } from '../../fake-database/getFakeDatabase';
import type { IngredientDto } from '../dto/IngredientDto';
import type { IngredientApiClient } from '../real/IngredientApiClient';
import { fakeResponse } from './fakeResponse';

export const fakeIngredientApiClient: Partial<IngredientApiClient> = {
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
        imageUrl: imageUrl,
      });
    });

    await Promise.all(promises);

    return fakeResponse.ok(ingredients);
  },
};

function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}
