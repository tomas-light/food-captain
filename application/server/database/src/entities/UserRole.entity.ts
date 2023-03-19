import { Entity } from './Entity';

export interface UserRoleEntity extends Entity {
  user_id: number;
  role_id: number;
}
