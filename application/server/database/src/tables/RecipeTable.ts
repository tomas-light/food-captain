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
  allAsync(): Promise<RecipeForViewEntity[]>;

  byIdAsync(id: number): Promise<RecipeForViewEntity | undefined>;
  byIdsAsync(ids: number[]): Promise<RecipeForViewEntity[]>;
  byMenuIdAsync(menu_id: number): Promise<RecipeForViewEntity[]>;
  byMenuIdsAsync(menu_ids: number[]): Promise<RecipeForViewEntity[]>;

  insertAsync(entity: NewRecipeEntity): Promise<number | undefined>;

  updateAsync(
    entity: MakePropertiesOptional<
      RecipeEntity,
      | 'name'
      | 'image_id'
      | 'kcal'
      | 'cooking_time_in_minutes'
      | 'portion_weight_in_grams'
    >
  ): Promise<RecipeEntity | undefined>;

  deleteByIdAsync(id: number): Promise<boolean>;
}
