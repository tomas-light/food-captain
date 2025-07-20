import type { MenuTableEntity } from './MenuTable.entity';
import type { RecipeTableEntity } from './RecipeTable.entity';

export interface DishInMenuTableEntity {
  menu_id: MenuTableEntity['id'];
  recipe_id: RecipeTableEntity['id'];
  order_number?: number;
}
