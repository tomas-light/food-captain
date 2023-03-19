import { MakePropertiesOptional } from './utils';
import { UserEntity } from './entities';

export interface UserWithRoleEntity extends UserEntity {
  role_id?: number;
}

export interface UserTable {
  allAsync(): Promise<UserEntity[]>;

  byIdsAsync(ids: number[]): Promise<UserEntity[]>;

  byIdAsync(id: number): Promise<UserEntity | undefined>;

  allWithRoleAsync(): Promise<UserWithRoleEntity[]>;

  byIdWithRoleAsync(id: number): Promise<UserWithRoleEntity | undefined>;

  insertAsync(entity: Omit<UserEntity, 'id'>): Promise<number | undefined>;

  updateAsync(
    entity: MakePropertiesOptional<UserEntity, 'name' | 'email' | 'password'>
  ): Promise<UserWithRoleEntity | undefined>;

  deleteAsync(id: number): Promise<boolean>;
}
