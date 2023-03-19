import { Entity } from './Entity';

export interface DishEntity extends Entity {
  id: number;
  name: string;
  description?: string;
  image_id?: number;
  order_number?: number;
  menu_id?: number;
}
