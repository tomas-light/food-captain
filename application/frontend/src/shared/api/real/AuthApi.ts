import type { UserDto } from '../dto/UserDto';
import { ApiBase, ContentType } from './ApiBase';

export class AuthApi extends ApiBase {
  getMe = async () => {
    return this.request<UserDto>({
      method: 'GET',
      url: '/auth/me',
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  login = async (payload: { email: string; password: string }) => {
    return this.request({
      method: 'POST',
      url: '/auth/login',
      data: JSON.stringify(payload),
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  logout = async () => {
    return this.request({
      method: 'POST',
      url: '/auth/logout',
      type: ContentType.Json,
      responseType: 'json',
    });
  };
}
