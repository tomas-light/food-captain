import {
  Database,
  IngredientEntity,
  NewIngredientEntity,
} from '@food-captain/database';
import { Logger } from '@food-captain/server-utils';

export class IngredientService {
  constructor(
    private readonly db: Database,
    private readonly logger: Logger
  ) {}

  getAllAsync(...args: Parameters<Database['ingredient']['allAsync']>) {
    return this.db.ingredient.allAsync(...args);
  }

  async getManyAsync(ids: IngredientEntity['id'][]) {
    if (!ids.length) {
      return [];
    }

    return await this.db.ingredient.byIdsAsync(ids);
  }

  getByIdAsync(...args: Parameters<Database['ingredient']['byIdAsync']>) {
    return this.db.ingredient.byIdAsync(...args);
  }
  deleteByIdAsync(
    ...args: Parameters<Database['ingredient']['deleteByIdAsync']>
  ) {
    return this.db.ingredient.deleteByIdAsync(...args);
  }

  // async getByRecipeIdAsync(recipeId: RecipeEntity['id']) {
  //   // todo: make sql request in one call
  //   const allIngredientsInRecipe = await this.db.ingredientInRecipe.allAsync();
  //   const recipeIngredientIds = allIngredientsInRecipe
  //     .filter((ingredientInRecipe) => ingredientInRecipe.recipe_id === recipeId)
  //     .map((ingredientInRecipe) => ingredientInRecipe.ingredient_id);
  //
  //   const ingredients = await this.getManyAsync(recipeIngredientIds);
  //   return ingredients;
  // }

  async addAsync(newIngredient: NewIngredientEntity) {
    const ingredient = newIngredient as IngredientEntity;

    const ingredientId = await this.db.ingredient.insertAsync(newIngredient);
    if (ingredientId == null) {
      this.logger.warning(
        `Ingredient is not inserted in DB (ingredient id is ${ingredientId})`
      );
      return undefined;
    }

    ingredient.id = ingredientId;

    return ingredient;
  }

  async addMultipleAsync(newIngredients: NewIngredientEntity[]) {
    const ingredients = newIngredients as IngredientEntity[];

    const ingredientIds =
      await this.db.ingredient.insertMultipleAsync(newIngredients);
    if (ingredientIds == null) {
      this.logger.warning(
        `Ingredients are not inserted in DB (ingredient ids are ${
          Array.isArray(ingredientIds)
            ? (ingredientIds as any[]).join(',')
            : ingredientIds
        })`
      );
      return [];
    }

    if (ingredientIds.length !== newIngredients.length) {
      this.logger.warning(
        `Not all ingredients are inserted in DB (ingredient ids are ${ingredientIds.join(
          ','
        )})`
      );
      return [];
    }

    for (let index = 0; index < ingredientIds.length; index++) {
      const ingredient = ingredients[index];
      const id = ingredientIds[index];
      ingredient.id = id;
    }

    return ingredients;
  }

  async updateAsync(ingredient: IngredientEntity) {
    const exitedIngredient = await this.db.ingredient.byIdAsync(ingredient.id);
    if (!exitedIngredient) {
      this.logger.warning(
        `Ingredient is not found in DB (ingredient id is ${ingredient.id})`
      );
      return undefined;
    }

    const updatedIngredient = await this.db.ingredient.updateAsync(ingredient);
    return updatedIngredient;
  }
}
