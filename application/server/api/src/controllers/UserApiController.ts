import type { Request, Response } from 'express';
import { api, DELETE, GET, POST, PUT } from 'mvc-middleware/stage2';
import { UserWithRoleEntity } from '@food-captain/database';
import { Logger } from '@food-captain/server-utils';
import { UserService } from '../services/UserService';
import { BaseApiController } from '../base/BaseApiController';

@api
export default class UserApiController extends BaseApiController {
  constructor(
    private readonly userService: UserService,
    logger: Logger,
    request: Request,
    response: Response
  ) {
    super(logger, request, response);
  }

  @GET('users')
  async getUsersAsync() {
    const result = await this.userService.getAllAsync();
    return this.ok(result);
  }

  @GET('user/current')
  async getCurrentUserAsync() {
    const result = await this.userService.getUserByIdAsync(1); // todo: get authorized user
    return this.ok(result);
  }

  @POST('user')
  async addUserAsync(user: NewUserWithRoleDto) {
    const createdUser = await this.userService.addAsync(user);
    return this.ok(createdUser);
  }

  @PUT('user/:userId')
  async updateUserAsync(userId: number, user: UserWithRoleDto) {
    const updatedUser = await this.userService.updateAsync(user);
    return this.ok(updatedUser);
  }

  @DELETE('user/:userId')
  async deleteUserAsync(userId: number) {
    const user = await this.userService.getUserByIdAsync(userId);
    if (!user) {
      return this.notFound('user not found');
    }

    const removed = await this.userService.deleteAsync(user);
    return this.ok({ removed });
  }
}

export interface NewUserWithRoleDto extends Omit<UserWithRoleEntity, 'id'> {}
export interface UserWithRoleDto extends UserWithRoleEntity {}
