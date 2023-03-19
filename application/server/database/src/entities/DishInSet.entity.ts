import { Entity } from './Entity';

export interface DishInSetEntity extends Entity {
  dish_id: number;
  dish_set_id: number;
}
