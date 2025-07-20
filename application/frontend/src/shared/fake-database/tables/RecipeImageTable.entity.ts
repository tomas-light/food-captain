import type { ImageTableEntity } from './ImageTable.entity';
import type { RecipeTableEntity } from './RecipeTable.entity';

export interface RecipeImageTableEntity {
  recipe_id: RecipeTableEntity['id'];
  image_id: ImageTableEntity['id'];
}
