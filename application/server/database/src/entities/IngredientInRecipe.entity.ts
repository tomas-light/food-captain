import { Entity } from './Entity';

export interface IngredientInRecipeEntity extends Entity {
  recipe_id: number;
  ingredient_id: number;
  dimension_id?: number;
  size?: number;
}
