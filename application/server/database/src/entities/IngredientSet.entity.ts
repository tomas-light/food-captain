import { Entity } from './Entity';

export interface IngredientSetEntity extends Entity {
  id: number;
  name: string;
  image_id?: number;
}
