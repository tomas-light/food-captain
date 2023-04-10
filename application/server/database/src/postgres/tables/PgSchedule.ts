import { QueryConfig } from 'pg';
import { keyOf, MakePropertiesOptional } from '../../utils';
import {
  MenuEntity,
  MenuInScheduleEntity,
  ScheduleEntity,
} from '../../entities';
import {
  ScheduleTable,
  ScheduleWithMenuEntity,
} from '../../tables/ScheduleTable';
import { PgTableBase } from '../base';
import { PgMenu } from './PgMenu';
import { PgMenuInSchedule } from './PgMenuInSchedule';

export class PgSchedule
  extends PgTableBase<ScheduleEntity>
  implements ScheduleTable
{
  protected tableName = 'schedule';
  static get table() {
    return `${this.schema}.schedule`;
  }

  getWithMenuByIdAsync = async (
    id: number
  ): Promise<ScheduleWithMenuEntity[]> => {
    const queryConfig: QueryConfig = {
      text: `
        SELECT 
          _schedule.*, 
          _menu_in_schedule.${keyOf<MenuInScheduleEntity>('date')}, 
          _menu_in_schedule.${keyOf<MenuInScheduleEntity>('menu_id')}, 
          _menu.${keyOf<MenuEntity>('name')} as ${keyOf<ScheduleWithMenuEntity>(
        'menu_name'
      )}, 
          _menu.${keyOf<MenuEntity>('create_date')}, 
          _menu.${keyOf<MenuEntity>('last_update')}, 
          _menu.${keyOf<MenuEntity>('author_id')} 
        FROM ${this.table} _schedule 
        LEFT JOIN ${
          PgMenuInSchedule.table
        } _menu_in_schedule on _schedule.${keyOf<ScheduleEntity>(
        'id'
      )} = _menu_in_schedule.${keyOf<MenuInScheduleEntity>('schedule_id')} 
        JOIN ${
          PgMenu.table
        } _menu on _menu_in_schedule.${keyOf<MenuInScheduleEntity>(
        'menu_id'
      )} = _menu.${keyOf<MenuEntity>('id')} 
        WHERE _schedule.${keyOf<ScheduleEntity>('id')} = $1;
      `,
      values: [id],
    };

    const queryResult = await this.query<ScheduleWithMenuEntity>(queryConfig);
    return queryResult?.rows ?? [];
  };

  insertAsync = async (
    entity: Omit<ScheduleEntity, 'id'>
  ): Promise<number | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.table} (
          ${keyOf<ScheduleEntity>('author_id')}, 
          ${keyOf<ScheduleEntity>('name')}, 
        ) 
        VALUES($1, $2) RETURNING ${keyOf<ScheduleEntity>('id')};
      `,
      values: [entity.author_id, entity.name],
    };

    const queryResult = await this.query<ScheduleEntity>(queryConfig);
    return queryResult?.rows[0]?.id;
  };

  updateAsync = async (
    entity: MakePropertiesOptional<ScheduleEntity, 'author_id' | 'name'>
  ): Promise<ScheduleEntity | undefined> => {
    const queryConfig = this.makeUpdateQueryConfig(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<ScheduleEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  };
}
