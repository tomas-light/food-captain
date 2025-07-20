import type { DimensionTableEntity } from './DimensionTable.entity';
import type { IngredientTableEntity } from './IngredientTable.entity';
import type { RecipeTableEntity } from './RecipeTable.entity';

export interface IngredientInRecipeTableEntity {
  recipe_id: RecipeTableEntity['id'];
  ingredient_id: IngredientTableEntity['id'];
  dimension_id?: DimensionTableEntity['id'];
  size?: number;
}
