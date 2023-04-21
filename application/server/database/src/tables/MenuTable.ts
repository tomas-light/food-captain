import { MakePropertiesOptional } from '../utils';
import { RecipeEntity, MenuEntity } from '../entities';

export interface MenuWithDateEntity extends MenuEntity {
  date: Date;
}

export interface MenuWithDishesEntity
  extends MenuEntity,
    Omit<RecipeEntity, 'id' | 'name'> {
  recipe_id: number;
  recipe_name: string;
  order_number?: number;
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
