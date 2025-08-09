import type { UserTableEntity } from './UserTable.entity';

export interface ScheduleTableEntity {
  id: number;
  author_id?: UserTableEntity['id'];
  name?: string;
  /** iso */
  created_at: string;
}
