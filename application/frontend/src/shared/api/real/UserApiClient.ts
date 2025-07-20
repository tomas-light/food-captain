import type { UserDto } from '../dto/UserDto';
import { ApiBaseClient, ContentType } from './ApiBaseClient';

export class UserApiClient extends ApiBaseClient {
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
}
