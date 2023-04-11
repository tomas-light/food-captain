import { Database } from '@food-captain/database';
import { UserWithRoleEntity } from '@food-captain/database/src/tables';
import { Logger, metadata } from '@food-captain/server-utils';
import { MakeOptional } from '../utils/MakeOptional';

@metadata
export class UserService {
  constructor(private readonly db: Database, private readonly logger: Logger) {}

  getAllAsync(...args: Parameters<Database['user']['allWithRoleAsync']>) {
    return this.db.user.allWithRoleAsync(...args);
  }

  getUserByIdAsync(...args: Parameters<Database['user']['byIdWithRoleAsync']>) {
    return this.db.user.byIdWithRoleAsync(...args);
  }

  async addAsync(
    userWithoutId: MakeOptional<UserWithRoleEntity, 'id'>
  ): Promise<UserWithRoleEntity | undefined> {
    const user = userWithoutId as UserWithRoleEntity;

    const userId = await this.db.user.insertAsync({
      name: user.name,
      email: user.email,
      password: user.password, // todo: add password encryption
    });

    if (userId == null) {
      this.logger.warning(`User is not inserted in DB (user id is ${userId})`);
      return undefined;
    }

    user.id = userId;

    if (user.role_id != null) {
      await this.db.userRole.insertAsync({
        user_id: user.id,
        role_id: user.role_id,
      });
    }

    return user;
  }

  async updateAsync(
    partialUser: MakeOptional<UserWithRoleEntity, 'name' | 'email' | 'password'>
  ): Promise<UserWithRoleEntity | undefined> {
    const userEntity = await this.db.user.updateAsync(partialUser);
    if (!userEntity) {
      return undefined;
    }

    const updatedUser: UserWithRoleEntity = {
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      password: userEntity.password,
    };

    if (partialUser.role_id != null) {
      const wasRoleUpdated = await this.updateUserRoleAsync(
        partialUser.id,
        partialUser.role_id
      );
      if (wasRoleUpdated) {
        updatedUser.role_id = partialUser.role_id;
      }
    }

    return updatedUser;
  }

  async updateUserRoleAsync(userId: number, roleId: number): Promise<boolean> {
    const existingRoles = await this.db.userRole.getByUserIdAsync(userId);
    if (existingRoles.length > 1) {
      this.logger.error(
        `There are many roles assigned to the user with same roleId (${roleId}). We can't to decide which of them should be updated.`
      );
      return false;
    }

    if (existingRoles.length === 1) {
      const [role] = existingRoles;

      const wasRoleDeleted = await this.db.userRole.deleteAsync({
        role_id: role.role_id,
        user_id: userId,
      });

      if (!wasRoleDeleted) {
        return false;
      }
    }

    return await this.db.userRole.insertAsync({
      role_id: roleId,
      user_id: userId,
    });
  }

  async deleteAsync(user: UserWithRoleEntity): Promise<boolean> {
    const { role_id } = user;

    if (role_id != null) {
      const wasRoleDeleted = await this.db.userRole.deleteAsync({
        role_id: role_id,
        user_id: user.id,
      });

      if (!wasRoleDeleted) {
        return false;
      }
    }

    return await this.db.user.deleteByIdAsync(user.id);
  }
}
