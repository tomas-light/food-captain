import { DishInSetEntity } from '../entities';

export interface DishInSetTable {
  allAsync(): Promise<DishInSetEntity[]>;

  // todo: possible redundant
  getAsync(
    dish_set_id: number,
    dish_id: number
  ): Promise<DishInSetEntity | undefined>;

  insertAsync(entity: DishInSetEntity): Promise<boolean>;

  deleteAsync(entity: DishInSetEntity): Promise<boolean>;
}
