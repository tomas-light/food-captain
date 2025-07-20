import { getFakeDatabase } from '../../fake-database/getFakeDatabase';
import type { ImageTableEntity } from '../../fake-database/tables/ImageTable.entity';
import type { IngredientDto } from '../dto/IngredientDto';
import type { IngredientApiClient } from '../real/IngredientApiClient';
import { fakeResponse } from './fakeResponse';

export const fakeIngredientApiClient: Partial<IngredientApiClient> = {
  getIngredients: async () => {
    const database = await getFakeDatabase();
    const allIngredients = await database.ingredient.getAll();

    const imagePromises: Promise<ImageTableEntity | undefined>[] = [];

    allIngredients.forEach((ingredient) => {
      if (ingredient.image_id != null) {
        imagePromises.push(database.image.get(ingredient.image_id));
      }
    });

    const images = await Promise.all(imagePromises);

    const imageUrlPromises: Promise<void>[] = [];
    const ingredients: IngredientDto[] = [];

    for (let index = 0; index < allIngredients.length; index++) {
      const ingredient = allIngredients[index];

      const ingredientDto: IngredientDto = {
        id: ingredient.id,
        name: ingredient.name,
      };

      const image = images[index];
      if (image) {
        const promise = toBase64(image.content).then((url) => {
          ingredientDto.imageUrl = url;
        });
        imageUrlPromises.push(promise);
      }
      ingredients.push(ingredientDto);
    }

    await Promise.all(imageUrlPromises);

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
