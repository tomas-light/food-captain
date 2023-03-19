import { Entity } from './Entity';

export interface MenuInScheduleEntity extends Entity {
  schedule_id: number;
  menu_id: number;
  date: string;
}
