import { faker } from '@faker-js/faker';
import type { Database } from '../../database';
import type { DimensionTableEntity } from './DimensionTable.entity';
import type { IngredientInRecipeTableEntity } from './IngredientInRecipeTable.entity';
import type { IngredientTableEntity } from './IngredientTable.entity';
import type { RecipeTableEntity } from './RecipeTable.entity';

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
  recipes: RecipeTableEntity[];
  ingredients: IngredientTableEntity[];
  dimensions: DimensionTableEntity[];
}) {
  const { database, recipes, ingredients, dimensions } = options;

  const ingredientsInRecipes: IngredientInRecipeTableEntity[] = [];

  recipes.forEach((recipe) => {
    const randomIngredient = faker.helpers.arrayElements(ingredients, {
      min: 1,
      max: 5,
    });

    randomIngredient.forEach((ingredient) => {
      ingredientsInRecipes.push({
        recipe_id: recipe.id,
        ingredient_id: ingredient.id,
        size: faker.number.int({ min: 1, max: 5 }),
        dimension_id: faker.helpers.arrayElement(dimensions).id,
      });
    });
  });

  return {
    saveIngredientsInRecipes: () => {
      ingredientsInRecipes.forEach((ingredientInRecipe) => {
        const key: IngredientInRecipeTableCompositeId = `${ingredientInRecipe.recipe_id}:${ingredientInRecipe.ingredient_id}`;
        void database.ingredientInRecipe.insert(key, ingredientInRecipe);
      });
    },
  };
}
