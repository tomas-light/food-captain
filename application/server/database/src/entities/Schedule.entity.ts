import { Entity } from './Entity';

export interface ScheduleEntity extends Entity {
  id: number;
  author_id?: number;
  name?: string;
}
