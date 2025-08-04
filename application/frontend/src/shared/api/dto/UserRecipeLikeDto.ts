import type { RecipeDto } from './RecipeDto';
import type { UserDto } from './UserDto';

export interface UserRecipeLikeDto {
  user_id: UserDto['id'];
  recipe_id: RecipeDto['id'];
  status: 'like' | 'dislike' | undefined;
}
