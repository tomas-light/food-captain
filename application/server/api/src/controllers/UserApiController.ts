import { Database } from '@food-captain/database';
import { UserWithRoleEntity } from '@food-captain/database/src/tables';
import { Logger } from '@food-captain/server-utils';
import type { Request, Response } from 'express';
import { api, get, MvcController } from 'mvc-middleware';

@api
export default class UserApiController extends MvcController {
  constructor(
    protected readonly logger: Logger,
    private readonly db: Database,
    request: Request,
    response: Response
  ) {
    super(request, response);

    const message = `${request.method.toUpperCase()}: ${request.url}`;
    this.logger.info(message);
  }

  @get('users')
  async getUsersAsync() {
    const result = await this.db.user.allWithRoleAsync();
    return this.ok(result);
  }
}

export interface UserWithRoleDto extends UserWithRoleEntity {}
