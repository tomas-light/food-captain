import type { AuthApiClient } from '~/shared/api/real/AuthApiClient';

export class AuthApi {
  constructor(private readonly apiClient: AuthApiClient) {}

  getMe = async () => {
    const response = await this.apiClient.getMe();
    return response.data;
  };

  login = async (emailPassword: Parameters<AuthApiClient['login']>[0]) => {
    const response = await this.apiClient.login(emailPassword);
    return response.data;
  };
}
