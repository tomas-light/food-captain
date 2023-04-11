import { Dimension } from './Dimension';
import { Ingredient } from './Ingredient';

export interface IngredientInRecipe extends Ingredient {
  dimension: Dimension;
  size: number;
}
