import { MakePropertiesOptional } from '../utils';
import {
  IngredientInRecipeEntity,
  NewRecipeEntity,
  RecipeEntity,
} from '../entities';

export interface RecipeWithIngredientsEntity extends RecipeEntity {
  ingredients: Omit<IngredientInRecipeEntity, 'recipe_id'>[];
}

export interface RecipeTable {
  allAsync(): Promise<RecipeEntity[]>;

  byIdAsync(id: number): Promise<RecipeEntity | undefined>;
  byIdsAsync(ids: number[]): Promise<RecipeEntity[]>;

  byIdWithIngredientsAsync(
    id: number
  ): Promise<RecipeWithIngredientsEntity | undefined>;

  byDishIdWithIngredientsAsync(
    dishId: number
  ): Promise<RecipeWithIngredientsEntity | undefined>;

  insertAsync(entity: NewRecipeEntity): Promise<number | undefined>;

  updateAsync(
    entity: MakePropertiesOptional<
      RecipeEntity,
      'name' | 'dish_id' | 'image_id'
    >
  ): Promise<RecipeEntity | undefined>;

  deleteByIdAsync(id: number): Promise<boolean>;
}
