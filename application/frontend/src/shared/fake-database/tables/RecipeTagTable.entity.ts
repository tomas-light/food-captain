import type { RecipeTableEntity } from './RecipeTable.entity';
import type { TagTableEntity } from './TagTable.entity';

export interface RecipeTagTableEntity {
  recipe_id: RecipeTableEntity['id'];
  tag_id: TagTableEntity['id'];
}
