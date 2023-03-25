import { DishInMenuEntity } from '../entities';

export interface DishInMenuTable {
  allAsync(): Promise<DishInMenuEntity[]>;

  getAsync(
    menu_id: number,
    dish_id: number
  ): Promise<DishInMenuEntity | undefined>;

  insertAsync(entity: DishInMenuEntity): Promise<boolean>;

  updateAsync(entity: DishInMenuEntity): Promise<DishInMenuEntity | undefined>;

  deleteAsync(
    entity: Pick<DishInMenuEntity, 'menu_id' | 'dish_id'>
  ): Promise<boolean>;

  deleteByIdsAsync(dish_ids: number[]): Promise<boolean>;

  deleteAllByMenuIdAsync(menu_id: number): Promise<boolean>;

  deleteAllByDishIdAsync(dish_id: number): Promise<boolean>;
}
