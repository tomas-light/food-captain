import { MakePropertiesOptional } from '../utils';
import { DishEntity } from '../entities';

export interface MenuDishesEntity extends DishEntity {
  menu_id: number;
  order_number?: number;
}

export interface DishTable {
  allAsync(): Promise<DishEntity[]>;

  byIdAsync(id: number): Promise<DishEntity | undefined>;

  byMenuIdAsync(menuId: number): Promise<MenuDishesEntity[]>;

  byMenuIdsAsync(menuIds: number[]): Promise<MenuDishesEntity[]>;

  insertAsync(entity: Omit<DishEntity, 'id'>): Promise<number | undefined>;

  updateAsync(
    entity: MakePropertiesOptional<DishEntity, 'name'>
  ): Promise<DishEntity | undefined>;

  deleteByIdAsync(id: number): Promise<boolean>;
}
