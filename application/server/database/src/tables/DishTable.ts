import { MakePropertiesOptional } from '../utils';
import { DishEntity } from '../entities';

export interface MenuDishEntity extends DishEntity {
  menu_id: number;
  order_number?: number;
}

export interface DishTable {
  allAsync(): Promise<DishEntity[]>;

  byIdAsync(id: number): Promise<DishEntity | undefined>;
  byIdsAsync(ids: number[]): Promise<DishEntity[]>;

  byMenuIdAsync(menuId: number): Promise<MenuDishEntity[]>;

  byMenuIdsAsync(menuIds: number[]): Promise<MenuDishEntity[]>;

  insertAsync(entity: Omit<DishEntity, 'id'>): Promise<number | undefined>;

  updateAsync(
    entity: MakePropertiesOptional<DishEntity, 'name'>
  ): Promise<DishEntity | undefined>;

  deleteByIdAsync(id: number): Promise<boolean>;
}
