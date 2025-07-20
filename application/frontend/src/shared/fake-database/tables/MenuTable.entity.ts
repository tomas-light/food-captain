import type { UserTableEntity } from './UserTable.entity';

export interface MenuTableEntity {
  id: number;
  /** iso */
  create_date: string;
  /** iso */
  last_update: string;
  author_id?: UserTableEntity['id'];
  name?: string;
  order_number?: number;
}
