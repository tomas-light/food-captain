import type { Database } from '../../database';
import type { RecipeImageTableEntity } from './RecipeImageTable.entity';

type RecipeImageTableCompositeId =
  `${RecipeImageTableEntity['recipe_id']}:${RecipeImageTableEntity['image_id']}`;

export interface RecipeImageTable {
  key: RecipeImageTableCompositeId;
  value: RecipeImageTableEntity;
}

export function initRecipeImageTable(options: {
  database: Database<{
    recipeImage: RecipeImageTable;
  }>;
}) {
  const { database } = options;

  const recipeImages: RecipeImageTableEntity[] = [];

  return {
    saveRecipeImages: () => {
      recipeImages.forEach((recipeImage) => {
        const key: RecipeImageTableCompositeId = `${recipeImage.recipe_id}:${recipeImage.image_id}`;
        void database.recipeImage.insert(key, recipeImage);
      });
    },
  };
}
