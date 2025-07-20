import type { MenuTableEntity } from './MenuTable.entity';
import type { ScheduleTableEntity } from './ScheduleTable.entity';

export interface MenuInScheduleTableEntity {
  schedule_id: ScheduleTableEntity['id'];
  menu_id: MenuTableEntity['id'];
  date: string;
}
