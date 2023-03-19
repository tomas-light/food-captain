import { Entity } from './Entity';

export interface UserEntity extends Entity {
  id: number;
  name: string;
  email: string;
  password: string;
}
