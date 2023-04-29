import {
  Database,
  IngredientInRecipeEntity,
  NewRecipeEntity,
  RecipeEntity,
  RecipeTagEntity,
} from '@food-captain/database';
import { Logger, metadata } from '@food-captain/server-utils';
import { MakeOptional } from '../utils/MakeOptional';
import { DimensionService } from './DimensionService';
import { ImageService } from './ImageService';
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

  getManyAsync(...args: Parameters<Database['recipe']['byIdsAsync']>) {
    return this.db.recipe.byIdsAsync(...args);
  }

  getByFilterAsync(...args: Parameters<Database['recipe']['filterAsync']>) {
    return this.db.recipe.filterAsync(...args);
  }

  getRandomRecipeByFilterAsync(
    ...args: Parameters<Database['recipe']['takeRandomRecipeByFiltersAsync']>
  ) {
    return this.db.recipe.takeRandomRecipeByFiltersAsync(...args);
  }

  getByIdAsync(...args: Parameters<Database['recipe']['byIdAsync']>) {
    return this.db.recipe.byIdAsync(...args);
  }

  getMaxKcalAsync(...args: Parameters<Database['recipe']['findMaxKcalAsync']>) {
    return this.db.recipe.findMaxKcalAsync(...args);
  }

  getMaxCookingTimeAsync(
    ...args: Parameters<Database['recipe']['findMaxCookingTimeAsync']>
  ) {
    return this.db.recipe.findMaxCookingTimeAsync(...args);
  }

  async addAsync(
    newRecipe: NewRecipeEntity & {
      ingredients: IngredientForRecipe[];
      tags: TagForRecipe[];
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

    if (ingredientInRecipeEntities.length) {
      const areIngredientsAddedToRecipe =
        await this.db.ingredientInRecipe.insertMultipleAsync(
          ingredientInRecipeEntities
        );

      if (!areIngredientsAddedToRecipe) {
        this.logger.warning('Ingredients were not added to recipe in DB');
      }
    }

    const tagInRecipeEntities: RecipeTagEntity[] = newRecipe.tags.map(
      (tag) => ({
        ...tag,
        recipe_id: recipeId,
      })
    );

    if (tagInRecipeEntities.length) {
      const areTagsAddedToRecipe = await this.db.recipeTag.insertMultipleAsync(
        tagInRecipeEntities
      );

      if (!areTagsAddedToRecipe) {
        this.logger.warning('Tags were not added to recipe in DB');
      }
    }

    return recipe;
  }

  async updateAsync(
    recipe: MakeOptional<RecipeEntity, 'name'> & {
      ingredients: IngredientForRecipe[];
      tags: TagForRecipe[];
    }
  ): Promise<RecipeEntity | undefined> {
    const recipeEntity = await this.db.recipe.updateAsync(recipe);
    if (!recipeEntity) {
      return undefined;
    }

    await this.updateIngredientsInRecipe(recipe);
    await this.updateTagsInRecipe(recipe);

    return {
      ...recipeEntity,
    };
  }

  private async updateIngredientsInRecipe(
    recipe: Pick<RecipeEntity, 'id'> & {
      ingredients: IngredientForRecipe[];
    }
  ) {
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
  }

  private async updateTagsInRecipe(
    recipe: Pick<RecipeEntity, 'id'> & {
      tags: TagForRecipe[];
    }
  ) {
    const recipeTags = await this.db.recipeTag.getByRecipeIdAsync(recipe.id);
    const recipeTagsSet = new Set(
      recipeTags.map((ingredient) => ingredient.tag_id)
    );

    const tagsToAdd: TagForRecipe[] = [];
    const tagsToRemove: TagForRecipe[] = [];

    const newRecipeTagsSet = new Set(recipe.tags.map((tag) => tag.tag_id));
    recipeTags.forEach((existedTag) => {
      if (!newRecipeTagsSet.has(existedTag.tag_id)) {
        tagsToRemove.push(existedTag);
      }
    });

    recipe.tags.forEach((tag) => {
      if (!recipeTagsSet.has(tag.tag_id)) {
        tagsToAdd.push(tag);
      }
    });

    if (tagsToRemove.length) {
      const areIngredientsRemovedToRecipe =
        await this.db.recipeTag.deleteMultipleAsync(
          recipe.id,
          tagsToRemove.map((tag) => tag.tag_id)
        );
      if (!areIngredientsRemovedToRecipe) {
        this.logger.warning('Tags were not removed from recipe in DB');
      }
    }

    if (tagsToAdd.length) {
      const areTagsAddedToRecipe = await this.db.recipeTag.insertMultipleAsync(
        tagsToAdd.map((tag) => ({
          ...tag,
          recipe_id: recipe.id,
        }))
      );
      if (!areTagsAddedToRecipe) {
        this.logger.warning('Tags were not added to recipe in DB');
      }
    }
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
export interface TagForRecipe extends Omit<RecipeTagEntity, 'recipe_id'> {}
