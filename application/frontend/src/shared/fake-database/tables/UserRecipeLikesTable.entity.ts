import type { RecipeTableEntity } from './RecipeTable.entity';
import type { UserTableEntity } from './UserTable.entity';

export interface UserRecipeLikesTableEntity {
  id: `${UserTableEntity['id']}/${RecipeTableEntity['id']}`;
  user_id: UserTableEntity['id'];
  recipe_id: RecipeTableEntity['id'];
  status: 'like' | 'dislike' | undefined;
}
