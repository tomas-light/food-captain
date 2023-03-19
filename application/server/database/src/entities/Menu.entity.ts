import { Entity } from './Entity';

export interface MenuEntity extends Entity {
  id: number;
  create_date: string;
  last_update: string;
  author_id?: number;
  name?: string;
  order_number?: number;
}
