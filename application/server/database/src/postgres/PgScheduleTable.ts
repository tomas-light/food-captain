import { QueryConfig } from 'pg';
import { keyOf, MakePropertiesOptional } from '../utils';

import { MenuEntity, MenuInScheduleEntity, ScheduleEntity } from '../entities';
import { ScheduleTable, ScheduleWithMenuEntity } from '../ScheduleTable';
import { PgTableBase } from './base';

export class PgScheduleTable
  extends PgTableBase<ScheduleEntity>
  implements ScheduleTable
{
  protected tableName = 'schedule';

  async getWithMenuByIdAsync(id: number): Promise<ScheduleWithMenuEntity[]> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT 
          _schedule.*, 
          _ms.${keyOf<MenuInScheduleEntity>('date')}, 
          _ms.${keyOf<MenuInScheduleEntity>('menu_id')}, 
          _menu.${keyOf<MenuEntity>('name')} as ${keyOf<ScheduleWithMenuEntity>(
        'menu_name'
      )}, 
          _menu.${keyOf<MenuEntity>('create_date')}, 
          _menu.${keyOf<MenuEntity>('last_update')}, 
          _menu.${keyOf<MenuEntity>('author_id')} 
        FROM ${this.tableName} _schedule 
        LEFT JOIN menu_in_schedule _ms on _schedule.${keyOf<ScheduleEntity>(
          'id'
        )} = _ms.${keyOf<MenuInScheduleEntity>('schedule_id')} 
        JOIN menu _menu on _ms.${keyOf<MenuInScheduleEntity>(
          'menu_id'
        )} = _menu.${keyOf<MenuEntity>('id')} 
        WHERE _schedule.${keyOf<ScheduleEntity>('id')} = $1;
      `,
      values: [id],
    };

    const queryResult = await this.query<ScheduleWithMenuEntity>(queryConfig);
    return queryResult?.rows ?? [];
  }

  async insertAsync(
    entity: Omit<ScheduleEntity, 'id'>
  ): Promise<number | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${keyOf<ScheduleEntity>('author_id')}, 
          ${keyOf<ScheduleEntity>('name')}, 
        ) 
        VALUES($1, $2) RETURNING ${keyOf<ScheduleEntity>('id')};
      `,
      values: [entity.author_id, entity.name],
    };

    const queryResult = await this.query<ScheduleEntity>(queryConfig);
    return queryResult?.rows[0]?.id;
  }

  async updateAsync(
    entity: MakePropertiesOptional<ScheduleEntity, 'author_id' | 'name'>
  ): Promise<ScheduleEntity | undefined> {
    const queryConfig = this.makeUpdateQueryConfig(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<ScheduleEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  }
}
