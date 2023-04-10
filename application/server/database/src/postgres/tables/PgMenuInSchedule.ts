import { QueryConfig } from 'pg';
import { MenuInScheduleEntity } from '../../entities';
import { MenuInScheduleTable } from '../../tables/MenuInScheduleTable';
import { keyOf } from '../../utils';
import { PgTableBase } from '../base';

export class PgMenuInSchedule
  extends PgTableBase<MenuInScheduleEntity>
  implements MenuInScheduleTable
{
  protected tableName = 'menu_in_schedule';
  static get table() {
    return `${this.schema}.menu_in_schedule`;
  }

  getAsync = async (
    schedule_id: number,
    menu_id: number
  ): Promise<MenuInScheduleEntity | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.table} 
        WHERE ${keyOf<MenuInScheduleEntity>('schedule_id')} = $1 
        AND ${keyOf<MenuInScheduleEntity>('menu_id')} = $2;
      `,
      values: [schedule_id, menu_id],
    };

    const queryResult = await this.query<MenuInScheduleEntity>(queryConfig);
    return queryResult?.rows[0];
  };

  getByScheduleIdAsync = async (
    schedule_id: number
  ): Promise<MenuInScheduleEntity[]> => {
    const queryConfig: QueryConfig = {
      text: `
        SELECT *
        FROM ${this.table}
        WHERE ${keyOf<MenuInScheduleEntity>('schedule_id')} = $1;
      `,
      values: [schedule_id],
    };

    const queryResult = await this.query<MenuInScheduleEntity>(queryConfig);
    return queryResult?.rows ?? [];
  };

  getByMenuIdAsync = async (
    menu_id: number
  ): Promise<MenuInScheduleEntity[]> => {
    const queryConfig: QueryConfig = {
      text: `
        SELECT *
        FROM ${this.table}
        WHERE ${keyOf<MenuInScheduleEntity>('menu_id')} = $1;
      `,
      values: [menu_id],
    };

    const queryResult = await this.query<MenuInScheduleEntity>(queryConfig);
    return queryResult?.rows ?? [];
  };

  insertAsync = async (entity: MenuInScheduleEntity): Promise<boolean> => {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.table} (
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
  };

  updateAsync = async (
    entity: MenuInScheduleEntity
  ): Promise<MenuInScheduleEntity | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        UPDATE ${this.table} 
        SET ${keyOf<MenuInScheduleEntity>('date')} = $1 
        WHERE ${keyOf<MenuInScheduleEntity>('schedule_id')} = $2 
        AND ${keyOf<MenuInScheduleEntity>('menu_id')} = $3;
      `,
      values: [entity.date, entity.schedule_id, entity.menu_id],
    };

    await this.query<MenuInScheduleEntity>(queryConfig);
    return this.getAsync(entity.schedule_id, entity.menu_id);
  };

  deleteAsync = async (
    entity: Pick<MenuInScheduleEntity, 'schedule_id' | 'menu_id'>
  ): Promise<boolean> => {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.table} 
        WHERE ${keyOf<MenuInScheduleEntity>('schedule_id')} = $1 
        AND ${keyOf<MenuInScheduleEntity>('menu_id')} = $2;
      `,
      values: [entity.schedule_id, entity.menu_id],
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };

  deleteByIdsAsync = async (menu_ids: number[]): Promise<boolean> => {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.table} 
        WHERE ${keyOf<MenuInScheduleEntity>('schedule_id')} in ($1);
      `,
      values: menu_ids,
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };

  deleteAllByScheduleIdAsync = async (
    schedule_id: number
  ): Promise<boolean> => {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.table} 
        WHERE ${keyOf<MenuInScheduleEntity>('schedule_id')} = $1;
      `,
      values: [schedule_id],
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };

  deleteAllByMenuIdAsync = async (menu_id: number): Promise<boolean> => {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.table} 
        WHERE ${keyOf<MenuInScheduleEntity>('menu_id')} = $1;
      `,
      values: [menu_id],
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };
}
