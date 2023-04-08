import type { UserWithRoleDto } from '@food-captain/api';
import { metadata } from '@food-captain/client-utils';
import { ApiInterceptor } from './ApiInterceptor';
import { ApiBase } from './base/ApiBase';

@metadata
export class UserApi extends ApiBase {
  constructor(interceptor: ApiInterceptor) {
    super(interceptor);
  }
  async getUsersAsync() {
    return this.get<UserWithRoleDto[]>('/users');
  }
}
