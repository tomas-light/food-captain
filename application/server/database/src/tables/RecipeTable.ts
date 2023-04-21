import { MakePropertiesOptional } from '../utils';
import {
  IngredientInRecipeEntity,
  NewRecipeEntity,
  RecipeEntity,
  RecipeTagEntity,
} from '../entities';

export interface RecipeForViewEntity extends RecipeEntity {
  ingredients: Omit<IngredientInRecipeEntity, 'recipe_id'>[];
  tags: Omit<RecipeTagEntity, 'recipe_id'>[];
}

export interface RecipeTable {
  allAsync(): Promise<RecipeEntity[]>;

  byIdAsync(id: number): Promise<RecipeEntity | undefined>;
  byIdsAsync(ids: number[]): Promise<RecipeEntity[]>;

  byIdForViewAsync(id: number): Promise<RecipeForViewEntity | undefined>;

  byDishIdForViewAsync(dishId: number): Promise<RecipeForViewEntity[]>;

  insertAsync(entity: NewRecipeEntity): Promise<number | undefined>;

  updateAsync(
    entity: MakePropertiesOptional<
      RecipeEntity,
      'name' | 'dish_id' | 'image_id'
    >
  ): Promise<RecipeEntity | undefined>;

  deleteByIdAsync(id: number): Promise<boolean>;
}
