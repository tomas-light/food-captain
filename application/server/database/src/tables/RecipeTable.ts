import {
  IngredientInRecipeEntity,
  NewRecipeEntity,
  RecipeEntity,
  RecipeTagEntity,
  TagEntity,
} from '../entities';
import { MakePropertiesOptional } from '../utils';

export interface RecipeForViewEntity extends RecipeEntity {
  ingredients: Omit<IngredientInRecipeEntity, 'recipe_id'>[];
  tags: Omit<RecipeTagEntity, 'recipe_id'>[];
}

export interface RecipeFilters {
  tagIds?: TagEntity['id'][];
  includedIngredientIds?: IngredientInRecipeEntity['ingredient_id'][];
  excludedIngredientIds?: IngredientInRecipeEntity['ingredient_id'][];
  kcalLimit?: RecipeEntity['kcal'];
  cookingTimeLimit?: RecipeEntity['cooking_time_in_minutes'];
}

export interface RecipeTable {
  allAsync(): Promise<RecipeForViewEntity[]>;
  filterAsync(filters: RecipeFilters): Promise<RecipeForViewEntity[]>;
  takeRandomRecipeByFiltersAsync(
    filters: RecipeFilters
  ): Promise<RecipeForViewEntity | undefined>;

  findMaxKcalAsync(): Promise<RecipeEntity['kcal'] | undefined>;
  findMaxCookingTimeAsync(): Promise<
    RecipeEntity['cooking_time_in_minutes'] | undefined
  >;

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
