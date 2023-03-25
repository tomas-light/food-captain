import { MakePropertiesOptional } from '../utils';
import { DishEntity, DishSetEntity } from '../entities';

interface DishSetWithDishesEntity
  extends DishSetEntity,
    Omit<DishEntity, 'id' | 'name'> {
  dish_id: number;
  dish_name: string;
  image?: string;
}

interface DishSetTable {
  allAsync(): Promise<DishSetEntity[]>;

  byIdAsync(id: number): Promise<DishSetEntity | undefined>;

  getWithDishesByIdAsync(
    id: number
  ): Promise<DishSetWithDishesEntity | undefined>;

  insertAsync(entity: Omit<DishSetEntity, 'id'>): Promise<number | undefined>;

  updateAsync(
    entity: MakePropertiesOptional<DishSetEntity, 'name' | 'image_id'>
  ): Promise<DishSetEntity | undefined>;

  deleteByIdAsync(id: number): Promise<boolean>;
}

export { DishSetTable, DishSetWithDishesEntity };
