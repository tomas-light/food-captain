import type { UserWithRoleDto } from '@food-captain/api';
import { ApiInterceptor } from './ApiInterceptor';
import { ApiBase } from './base/ApiBase';

export class UserApi extends ApiBase {
  constructor(interceptor: ApiInterceptor) {
    super(interceptor);
  }
  async getUsersAsync() {
    return this.get<UserWithRoleDto[]>('/users');
  }
}
