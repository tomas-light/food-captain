import { IngredientInRecipeEntity } from './entities';

export interface IngredientInRecipeTable {
  allAsync(): Promise<IngredientInRecipeEntity[]>;

  getAsync(
    recipe_id: number,
    ingredient_id: number
  ): Promise<IngredientInRecipeEntity | undefined>;

  insertAsync(entity: IngredientInRecipeEntity): Promise<boolean>;

  updateAsync(
    entity: IngredientInRecipeEntity
  ): Promise<IngredientInRecipeEntity | undefined>;

  deleteAsync(
    entity: Pick<IngredientInRecipeEntity, 'recipe_id' | 'ingredient_id'>
  ): Promise<boolean>;
}
