import { ApiBaseClient, ContentType } from './ApiBaseClient';

export class AuthApiClient extends ApiBaseClient {
  isAuthorized = async () => {
    return this.request<boolean>({
      method: 'GET',
      url: '/auth/is-authorized',
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  login = async (payload: {
    email: string;
    password: string;
    afterLoginNavigateUrl?: string;
  }) => {
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
