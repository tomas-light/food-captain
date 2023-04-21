import { Entity } from './Entity';

export interface TagEntity extends Entity {
  id: number;
  name: string;
}

export interface NewTagEntity extends Omit<TagEntity, 'id'> {}
