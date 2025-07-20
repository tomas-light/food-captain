import type { Database } from '../../database';
import type { IngredientInRecipeTableEntity } from './IngredientInRecipeTable.entity';

type IngredientInRecipeTableCompositeId =
  `${IngredientInRecipeTableEntity['recipe_id']}:${IngredientInRecipeTableEntity['ingredient_id']}`;

export interface IngredientInRecipeTable {
  key: IngredientInRecipeTableCompositeId;
  value: IngredientInRecipeTableEntity;
}

export function initIngredientInRecipeTable(options: {
  database: Database<{
    ingredientInRecipe: IngredientInRecipeTable;
  }>;
}) {
  const { database } = options;

  const ingredientsInRecipes: IngredientInRecipeTableEntity[] = [
    create(11, 1, 3, 3),
    create(11, 14, 3, 2),
    create(11, 12, 2, 450),
    create(11, 13, 3, 4),
    create(11, 16, 5, 2),
    create(11, 15, 3, 1),
    create(11, 18, 2, 300),
    create(11, 17, 5, 4),
    create(11, 19, 7, 1),
    create(13, 1, 3, 1),
    create(13, 15, 3, 1),
    create(13, 20, 2, 400),
    create(13, 17, 5, 1),
  ];

  function create(
    recipe_id: IngredientInRecipeTableEntity['recipe_id'],
    ingredient_id: IngredientInRecipeTableEntity['ingredient_id'],
    dimension_id: IngredientInRecipeTableEntity['dimension_id'],
    size: IngredientInRecipeTableEntity['size']
  ): IngredientInRecipeTableEntity {
    return {
      recipe_id,
      ingredient_id,
      dimension_id,
      size,
    };
  }

  return {
    saveIngredientsInRecipes: () => {
      ingredientsInRecipes.forEach((ingredientInRecipe) => {
        const key: IngredientInRecipeTableCompositeId = `${ingredientInRecipe.recipe_id}:${ingredientInRecipe.ingredient_id}`;
        void database.ingredientInRecipe.insert(key, ingredientInRecipe);
      });
    },
  };
}
