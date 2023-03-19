import { Entity } from './Entity';

export interface IngredientInSetEntity extends Entity {
  ingredient_id: number;
  ingredient_set_id: number;
}
