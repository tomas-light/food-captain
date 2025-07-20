import type { Database } from '../../database';
import type { MenuInScheduleTableEntity } from './MenuInScheduleTable.entity';

type MenuInScheduleTableCompositeId =
  `${MenuInScheduleTableEntity['schedule_id']}:${MenuInScheduleTableEntity['menu_id']}`;

export interface MenuInScheduleTable {
  key: MenuInScheduleTableCompositeId;
  value: MenuInScheduleTableEntity;
}

export function initMenuInScheduleTable(options: {
  database: Database<{
    menuInSchedule: MenuInScheduleTable;
  }>;
}) {
  const { database } = options;

  const menusInSchedule: MenuInScheduleTableEntity[] = [];

  return {
    saveMenusInSchedule: () => {
      menusInSchedule.forEach((menuInSchedule) => {
        const key: MenuInScheduleTableCompositeId = `${menuInSchedule.schedule_id}:${menuInSchedule.menu_id}`;
        void database.menuInSchedule.insert(key, menuInSchedule);
      });
    },
  };
}
