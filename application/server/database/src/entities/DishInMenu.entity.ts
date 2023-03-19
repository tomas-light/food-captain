import { Entity } from './Entity';

export interface DishInMenuEntity extends Entity {
  menu_id: number;
  dish_id: number;
  order_number?: number;
}
