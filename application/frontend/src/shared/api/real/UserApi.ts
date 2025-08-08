import { DefaultUrlBuilder } from 'nice-web-routes';
import type { RecipeDto } from '../dto/RecipeDto';
import type { UserDto } from '../dto/UserDto';
import type { UserRecipeLikeDto } from '../dto/UserRecipeLikeDto';
import { ApiBase, ContentType } from './ApiBase';

export class UserApi extends ApiBase {
  getUsers = async () => {
    return this.request<UserDto[]>({
      method: 'GET',
      url: '/users',
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  getCurrentUser = async () => {
    return this.request<UserDto>({
      method: 'GET',
      url: '/user/me',
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  addUser = async (user: Omit<UserDto, 'id'>) => {
    return this.request<UserDto>({
      method: 'POST',
      url: '/user',
      data: JSON.stringify(user),
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  updateUser = async (user: UserDto) => {
    return this.request<UserDto>({
      method: 'PUT',
      url: `/user/${user.id}`,
      data: JSON.stringify(user),
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  deleteUser = async (userId: UserDto['id']) => {
    return this.request<boolean>({
      method: 'DELETE',
      url: `/user/${userId}`,
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  getUserRecipeLikes = async (
    userId: UserDto['id'],
    recipeIds?: RecipeDto['id'][]
  ) => {
    const builder = new DefaultUrlBuilder().addSearchParamsIfExists(
      `/user/${userId}/recipe-likes`
    );
    if (recipeIds?.length) {
      builder.addSearchParamsIfExists({
        'recipe-id': recipeIds.map((id) => id.toString()),
      });
    }

    return this.request<UserRecipeLikeDto[]>({
      method: 'GET',
      url: builder.build(),
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  likeRecipe = async (userId: UserDto['id'], recipeId: RecipeDto['id']) => {
    return this.request({
      method: 'POST',
      url: `/user/${userId}/recipe-likes/${recipeId}`,
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  dislikeRecipe = async (userId: UserDto['id'], recipeId: RecipeDto['id']) => {
    return this.request({
      method: 'PUT',
      url: `/user/${userId}/recipe-likes/${recipeId}`,
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  unlikeRecipe = async (userId: UserDto['id'], recipeId: RecipeDto['id']) => {
    return this.request({
      method: 'DELETE',
      url: `/user/${userId}/recipe-likes/${recipeId}`,
      type: ContentType.Json,
      responseType: 'json',
    });
  };
}
