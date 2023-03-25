import { RecipeImageEntity } from '../entities';

export interface RecipeImageTable {
  allAsync(): Promise<RecipeImageEntity[]>;

  // todo: possible redundant
  getAsync(
    recipe_id: number,
    image_id: number
  ): Promise<RecipeImageEntity | undefined>;

  insertAsync(entity: RecipeImageEntity): Promise<boolean>;

  deleteAsync(entity: RecipeImageEntity): Promise<boolean>;
}
