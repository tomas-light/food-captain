import { RecipeTagEntity } from '../entities';

export interface RecipeTagTable {
  allAsync(): Promise<RecipeTagEntity[]>;

  getByRecipeIdAsync(recipeId: number): Promise<RecipeTagEntity[]>;

  insertAsync(entity: RecipeTagEntity): Promise<boolean>;
  insertMultipleAsync(entity: RecipeTagEntity[]): Promise<boolean>;

  deleteAsync(entity: RecipeTagEntity): Promise<boolean>;
  deleteMultipleAsync(recipe_id: number, tag_ids: number[]): Promise<boolean>;
}
