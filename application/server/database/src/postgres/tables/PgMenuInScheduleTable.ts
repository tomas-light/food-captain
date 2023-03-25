import { QueryConfig } from 'pg';

import { MenuInScheduleEntity } from '../../entities';
import { MenuInScheduleTable } from '../../tables/MenuInScheduleTable';
import { keyOf } from '../../utils';
import { PgTableBase } from '../base';

export class PgMenuInScheduleTable
  extends PgTableBase<MenuInScheduleEntity>
  implements MenuInScheduleTable
{
  protected tableName = 'menu_in_schedule';

  async getAsync(
    schedule_id: number,
    menu_id: number
  ): Promise<MenuInScheduleEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.tableName} 
        WHERE ${keyOf<MenuInScheduleEntity>('schedule_id')} = $1 
        AND ${keyOf<MenuInScheduleEntity>('menu_id')} = $2;
      `,
      values: [schedule_id, menu_id],
    };

    const queryResult = await this.query<MenuInScheduleEntity>(queryConfig);
    return queryResult?.rows[0];
  }

  async getByScheduleIdAsync(
    schedule_id: number
  ): Promise<MenuInScheduleEntity[]> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT *
        FROM ${this.tableName}
        WHERE ${keyOf<MenuInScheduleEntity>('schedule_id')} = $1;
      `,
      values: [schedule_id],
    };

    const queryResult = await this.query<MenuInScheduleEntity>(queryConfig);
    return queryResult?.rows ?? [];
  }

  async getByMenuIdAsync(menu_id: number): Promise<MenuInScheduleEntity[]> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT *
        FROM ${this.tableName}
        WHERE ${keyOf<MenuInScheduleEntity>('menu_id')} = $1;
      `,
      values: [menu_id],
    };

    const queryResult = await this.query<MenuInScheduleEntity>(queryConfig);
    return queryResult?.rows ?? [];
  }

  async insertAsync(entity: MenuInScheduleEntity): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${keyOf<MenuInScheduleEntity>('schedule_id')}, 
          ${keyOf<MenuInScheduleEntity>('menu_id')}, 
          ${keyOf<MenuInScheduleEntity>('date')} 
        ) 
        VALUES($1, $2, $3);
      `,
      values: [entity.schedule_id, entity.menu_id, entity.date],
    };

    const queryResult = await this.query<MenuInScheduleEntity>(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  }

  async updateAsync(
    entity: MenuInScheduleEntity
  ): Promise<MenuInScheduleEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        UPDATE ${this.tableName} 
        SET ${keyOf<MenuInScheduleEntity>('date')} = $1 
        WHERE ${keyOf<MenuInScheduleEntity>('schedule_id')} = $2 
        AND ${keyOf<MenuInScheduleEntity>('menu_id')} = $3;
      `,
      values: [entity.date, entity.schedule_id, entity.menu_id],
    };

    await this.query<MenuInScheduleEntity>(queryConfig);
    return this.getAsync(entity.schedule_id, entity.menu_id);
  }

  async deleteAsync(
    entity: Pick<MenuInScheduleEntity, 'schedule_id' | 'menu_id'>
  ): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.tableName} 
        WHERE ${keyOf<MenuInScheduleEntity>('schedule_id')} = $1 
        AND ${keyOf<MenuInScheduleEntity>('menu_id')} = $2;
      `,
      values: [entity.schedule_id, entity.menu_id],
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  }

  async deleteByIdsAsync(menu_ids: number[]): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.tableName} 
        WHERE ${keyOf<MenuInScheduleEntity>('schedule_id')} in ($1);
      `,
      values: menu_ids,
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  }

  async deleteAllByScheduleIdAsync(schedule_id: number): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.tableName} 
        WHERE ${keyOf<MenuInScheduleEntity>('schedule_id')} = $1;
      `,
      values: [schedule_id],
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  }

  async deleteAllByMenuIdAsync(menu_id: number): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.tableName} 
        WHERE ${keyOf<MenuInScheduleEntity>('menu_id')} = $1;
      `,
      values: [menu_id],
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  }
}