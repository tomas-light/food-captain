import { MakePropertiesOptional } from '../utils';
import { MenuEntity, ScheduleEntity } from '../entities';

interface MenuWithDateEntity extends MenuEntity {
  date: Date;
}

interface ScheduleWithMenuEntity
  extends ScheduleEntity,
    Omit<MenuWithDateEntity, 'id' | 'name'> {
  menu_id: number;
  menu_name?: string;
}

interface ScheduleTable {
  allAsync(): Promise<ScheduleEntity[]>;

  byIdAsync(id: number): Promise<ScheduleEntity | undefined>;

  getWithMenuByIdAsync(id: number): Promise<ScheduleWithMenuEntity[]>;

  insertAsync(entity: Omit<ScheduleEntity, 'id'>): Promise<number | undefined>;

  updateAsync(
    entity: MakePropertiesOptional<ScheduleEntity, 'author_id' | 'name'>
  ): Promise<ScheduleEntity | undefined>;

  deleteByIdAsync(id: number): Promise<boolean>;
}

export { ScheduleTable, ScheduleWithMenuEntity };
