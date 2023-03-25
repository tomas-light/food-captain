import { IngredientInSetEntity } from '../entities';

export interface IngredientInSetTable {
  allAsync(): Promise<IngredientInSetEntity[]>;

  // todo: possible redundant
  getAsync(
    ingredient_set_id: number,
    ingredient_id: number
  ): Promise<IngredientInSetEntity | undefined>;

  insertAsync(entity: IngredientInSetEntity): Promise<boolean>;

  deleteAsync(entity: IngredientInSetEntity): Promise<boolean>;
}
