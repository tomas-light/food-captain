import { MakePropertiesOptional } from '../utils';
import { DishEntity, MenuEntity } from '../entities';

export interface MenuWithDateEntity extends MenuEntity {
  date: Date;
}

export interface MenuWithDishesEntity
  extends MenuEntity,
    Omit<DishEntity, 'id' | 'name'> {
  dish_id: number;
  dish_name: string;
  order_number?: number;
  image?: string;
}

export interface MenuTable {
  allAsync(): Promise<MenuEntity[]>;

  byIdAsync(id: number): Promise<MenuEntity | undefined>;

  byScheduleIdAsync(schedule_id: number): Promise<MenuWithDateEntity[]>;

  getWithDishesByIdAsync(id: number): Promise<MenuWithDishesEntity[]>;

  insertAsync(entity: Omit<MenuEntity, 'id'>): Promise<number | undefined>;

  updateAsync(
    entity: MakePropertiesOptional<
      MenuEntity,
      'create_date' | 'last_update' | 'author_id'
    >
  ): Promise<MenuEntity | undefined>;

  deleteByIdAsync(id: number): Promise<boolean>;
}
