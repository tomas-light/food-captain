import type { Database } from '../../database';
import type { ScheduleTableEntity } from './ScheduleTable.entity';

export interface ScheduleTable {
  key: ScheduleTableEntity['id'];
  value: ScheduleTableEntity;
}

export function initScheduleTable(options: {
  database: Database<{
    schedule: ScheduleTable;
  }>;
}) {
  const { database } = options;

  const schedules: ScheduleTableEntity[] = [];

  return {
    saveSchedules: () => {
      schedules.forEach((schedule) => {
        void database.schedule.insert(schedule.id, schedule);
      });
    },
  };
}
