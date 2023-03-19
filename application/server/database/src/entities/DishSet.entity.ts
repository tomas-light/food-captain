import { Entity } from './Entity';

export interface DishSetEntity extends Entity {
  id: number;
  name: string;
  image_id?: number;
}
