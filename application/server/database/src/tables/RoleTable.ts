import { RoleEntity } from '../entities';

export interface RoleTable {
  allAsync(): Promise<RoleEntity[]>;

  byIdAsync(id: number): Promise<RoleEntity | undefined>;

  insertAsync(entity: Omit<RoleEntity, 'id'>): Promise<number | undefined>;

  updateAsync(entity: RoleEntity): Promise<RoleEntity | undefined>;

  deleteByIdAsync(id: number): Promise<boolean>;
}
