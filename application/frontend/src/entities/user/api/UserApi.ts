import type { UserApiClient } from '~/shared/api';
import type { User } from '../model/User';
import type { Recipe } from '~/entities/recipe/crossExports';

export class UserApi {
  constructor(private readonly apiClient: UserApiClient) {}

  getUserRecipeLikes = async (userId: User['id'], recipeIds?: Recipe['id'][]) => {
    const response = await this.apiClient.getUserRecipeLikes(userId, recipeIds);
    return response.data;
  };

  likeRecipe = async (userId: User['id'], recipeId: Recipe['id']) => {
    await this.apiClient.likeRecipe(userId, recipeId);
  };

  dislikeRecipe = async (userId: User['id'], recipeId: Recipe['id']) => {
    await this.apiClient.dislikeRecipe(userId, recipeId);
  };

  unlikeRecipe = async (userId: User['id'], recipeId: Recipe['id']) => {
    await this.apiClient.unlikeRecipe(userId, recipeId);
  };
}
