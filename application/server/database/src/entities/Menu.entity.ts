import { Entity } from './Entity';

export abstract class MenuEntity extends Entity {
  abstract id: number;
  abstract create_date: string;
  abstract last_update: string;
  abstract author_id?: number;
  abstract name?: string;
  abstract order_number?: number;
}
