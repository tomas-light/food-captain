import { Entity } from './Entity';

export interface TagEntity extends Entity {
  id: number;
  name: string;
  color: string;
}

export interface NewTagEntity extends Omit<TagEntity, 'id'> {}
