import { MakePropertiesOptional } from '../utils';
import { IngredientInRecipeEntity, RecipeEntity } from '../entities';

export interface RecipeWithImageEntity extends RecipeEntity {
  image?: string;
}

export interface RecipeWithIngredientsEntity
  extends RecipeWithImageEntity,
    Omit<IngredientInRecipeEntity, 'recipe_id'> {
  ingredient_id: number;
  ingredient_name: string;
  ingredient_image_id?: number;
  ingredient_image?: string;
}

export interface RecipeTable {
  allAsync(): Promise<RecipeWithImageEntity[]>;

  byIdAsync(id: number): Promise<RecipeWithImageEntity | undefined>;

  getWithIngredientsByIdAsync(
    id: number
  ): Promise<RecipeWithIngredientsEntity | undefined>;

  insertAsync(entity: Omit<RecipeEntity, 'id'>): Promise<number | undefined>;

  updateAsync(
    entity: MakePropertiesOptional<
      RecipeEntity,
      'name' | 'dish_id' | 'image_id'
    >
  ): Promise<RecipeWithImageEntity | undefined>;

  deleteByIdAsync(id: number): Promise<boolean>;
}
