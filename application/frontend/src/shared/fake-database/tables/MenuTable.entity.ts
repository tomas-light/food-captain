import type { UserTableEntity } from './UserTable.entity';

export interface MenuTableEntity {
  id: number;
  /** iso */
  created_at: string;
  /** iso */
  last_update?: string;
  author_id?: UserTableEntity['id'];
  name?: string;
  order_number?: number;
}
