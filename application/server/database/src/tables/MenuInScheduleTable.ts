import { MenuInScheduleEntity } from '../entities';

export interface MenuInScheduleTable {
  allAsync(): Promise<MenuInScheduleEntity[]>;

  getAsync(
    schedule_id: number,
    menu_id: number
  ): Promise<MenuInScheduleEntity | undefined>;

  // getByScheduleIdAsync(schedule_id: number): Promise<MenuInScheduleEntity[]>;
  // getByMenuIdAsync(menu_id: number): Promise<MenuInScheduleEntity[]>;

  insertAsync(entity: MenuInScheduleEntity): Promise<boolean>;

  updateAsync(
    entity: MenuInScheduleEntity
  ): Promise<MenuInScheduleEntity | undefined>;

  deleteAsync(
    entity: Pick<MenuInScheduleEntity, 'schedule_id' | 'menu_id'>
  ): Promise<boolean>;

  deleteByIdsAsync(menu_ids: number[]): Promise<boolean>;

  deleteAllByScheduleIdAsync(schedule_id: number): Promise<boolean>;

  deleteAllByMenuIdAsync(menu_id: number): Promise<boolean>;
}
