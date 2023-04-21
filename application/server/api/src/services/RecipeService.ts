import {
  Database,
  ImageEntity,
  IngredientInRecipeEntity,
  NewRecipeEntity,
  RecipeEntity,
} from '@food-captain/database';
import { Logger, metadata } from '@food-captain/server-utils';
import { MakeOptional } from '../utils/MakeOptional';
import { DimensionService } from './DimensionService';
import { ImageService, NewImage } from './ImageService';
import { IngredientService } from './IngredientService';

@metadata
export class RecipeService {
  constructor(
    private readonly db: Database,
    private readonly dimensionService: DimensionService,
    private readonly ingredientService: IngredientService,
    private readonly imageService: ImageService,
    private readonly logger: Logger
  ) {}

  getAllAsync(...args: Parameters<Database['recipe']['allAsync']>) {
    return this.db.recipe.allAsync(...args);
  }

  getByDishIdWithIngredientsAsync(
    ...args: Parameters<Database['recipe']['byDishIdWithIngredientsAsync']>
  ) {
    return this.db.recipe.byDishIdWithIngredientsAsync(...args);
  }

  getManyAsync(...args: Parameters<Database['recipe']['byIdsAsync']>) {
    return this.db.recipe.byIdsAsync(...args);
  }

  getByIdAsync(...args: Parameters<Database['recipe']['byIdAsync']>) {
    return this.db.recipe.byIdAsync(...args);
  }

  getByIdWithIngredientsAsync(
    ...args: Parameters<Database['recipe']['byIdWithIngredientsAsync']>
  ) {
    return this.db.recipe.byIdWithIngredientsAsync(...args);
  }

  async addAsync(
    newRecipe: NewRecipeEntity & {
      ingredients: IngredientForRecipe[];
    }
  ): Promise<RecipeEntity | undefined> {
    const recipe = newRecipe as unknown as RecipeEntity;

    const recipeId = await this.db.recipe.insertAsync({
      ...recipe,
    });

    if (recipeId == null) {
      this.logger.warning(
        `Recipe is not inserted in DB (recipe id is ${recipeId})`
      );
      return undefined;
    }

    recipe.id = recipeId;

    const ingredientInRecipeEntities: IngredientInRecipeEntity[] =
      newRecipe.ingredients.map((ingredient) => ({
        ...ingredient,
        recipe_id: recipeId,
      }));

    const areIngredientsAddedToRecipe =
      await this.db.ingredientInRecipe.insertMultipleAsync(
        ingredientInRecipeEntities
      );

    if (!areIngredientsAddedToRecipe) {
      this.logger.warning('Ingredients were not added to recipe in DB');
    }

    return recipe;
  }

  async updateAsync(
    recipe: MakeOptional<RecipeEntity, 'name'> & {
      ingredients: IngredientForRecipe[];
    }
  ): Promise<RecipeEntity | undefined> {
    const recipeEntity = await this.db.recipe.updateAsync(recipe);
    if (!recipeEntity) {
      return undefined;
    }

    const recipeIngredients =
      await this.db.ingredientInRecipe.getByRecipeIdAsync(recipe.id);
    const recipeIngredientsSet = new Set(
      recipeIngredients.map((ingredient) => ingredient.ingredient_id)
    );

    const ingredientsToAdd: IngredientForRecipe[] = [];
    const ingredientsToRemove: IngredientForRecipe[] = [];
    const updatedIngredients: IngredientForRecipe[] = [];

    const newRecipeIngredientsSet = new Set(
      recipe.ingredients.map((ingredient) => ingredient.ingredient_id)
    );
    recipeIngredients.forEach((existedIngredient) => {
      if (!newRecipeIngredientsSet.has(existedIngredient.ingredient_id)) {
        ingredientsToRemove.push(existedIngredient);
      }
    });

    recipe.ingredients.forEach((ingredient) => {
      if (!recipeIngredientsSet.has(ingredient.ingredient_id)) {
        ingredientsToAdd.push(ingredient);
      } else {
        updatedIngredients.push(ingredient);
      }
    });

    if (ingredientsToRemove.length) {
      const areIngredientsRemovedToRecipe =
        await this.db.ingredientInRecipe.deleteMultipleAsync(
          recipe.id,
          ingredientsToRemove.map((ingredient) => ingredient.ingredient_id)
        );
      if (!areIngredientsRemovedToRecipe) {
        this.logger.warning('Ingredients were not removed from recipe in DB');
      }
    }

    const updateIngredientResults = await Promise.allSettled(
      updatedIngredients.map((ingredient) =>
        this.db.ingredientInRecipe.updateAsync({
          ...ingredient,
          recipe_id: recipe.id,
        })
      )
    );
    const rejectedUpdates = updateIngredientResults.filter(
      (result) => result.status === 'rejected'
    );
    if (rejectedUpdates.length) {
      this.logger.warning(
        `Some ingredients were not updated from recipe in DB (${rejectedUpdates
          .map((ingredient) => JSON.stringify(ingredient, null, 2))
          .join('\n')})`
      );
    }

    if (ingredientsToAdd.length) {
      const areIngredientsAddedToRecipe =
        await this.db.ingredientInRecipe.insertMultipleAsync(
          ingredientsToAdd.map((ingredient) => ({
            ...ingredient,
            recipe_id: recipe.id,
          }))
        );
      if (!areIngredientsAddedToRecipe) {
        this.logger.warning('Ingredients were not added to recipe in DB');
      }
    }

    return {
      ...recipeEntity,
    };
  }

  async deleteAsync(recipe: RecipeEntity): Promise<boolean> {
    if (recipe.image_id) {
      try {
        await this.imageService.deleteByIdAsync(recipe.image_id);
      } catch {
        // todo: image me ybe linked to another entities, it is valid case
      }
    }

    const recipeIngredients =
      await this.db.ingredientInRecipe.getByRecipeIdAsync(recipe.id);

    const ingredientIds = recipeIngredients.map(
      (ingredient) => ingredient.ingredient_id
    );

    const deleted = await this.db.ingredientInRecipe.deleteMultipleAsync(
      recipe.id,
      ingredientIds
    );
    if (!deleted) {
      this.logger.warning('Recipe ingredients were not removed from DB');
      return false;
    }

    return await this.db.recipe.deleteByIdAsync(recipe.id);
  }
}

export interface IngredientForRecipe
  extends Omit<IngredientInRecipeEntity, 'recipe_id'> {}
