import { QueryConfig } from 'pg';
import { DishInMenuTable } from '../../tables/DishInMenuTable';
import { DishInMenuEntity } from '../../entities';
import { keyOf } from '../../utils';
import { PgTableBase } from '../base';

export class PgDishInMenuTable
  extends PgTableBase<DishInMenuEntity>
  implements DishInMenuTable
{
  protected tableName = 'dish_in_menu';

  async getAsync(
    menu_id: number,
    dish_id: number
  ): Promise<DishInMenuEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.schema}.${this.tableName} 
        WHERE ${keyOf<DishInMenuEntity>('menu_id')} = $1 
        AND ${keyOf<DishInMenuEntity>('dish_id')} = $2;
      `,
      values: [menu_id, dish_id],
    };

    const queryResult = await this.query<DishInMenuEntity>(queryConfig);
    return queryResult?.rows[0];
  }

  async insertAsync(entity: DishInMenuEntity): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.schema}.${this.tableName} (
          ${keyOf<DishInMenuEntity>('menu_id')}, 
          ${keyOf<DishInMenuEntity>('dish_id')}, 
          ${keyOf<DishInMenuEntity>('order_number')} 
        ) 
        VALUES($1, $2, $3);
      `,
      values: [entity.menu_id, entity.dish_id, entity.order_number],
    };

    const queryResult = await this.query<DishInMenuEntity>(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  }

  async updateAsync(
    entity: DishInMenuEntity
  ): Promise<DishInMenuEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        UPDATE ${this.schema}.${this.tableName} 
        SET ${keyOf<DishInMenuEntity>('order_number')} = $1 
        WHERE ${keyOf<DishInMenuEntity>('menu_id')} = $2 
        AND ${keyOf<DishInMenuEntity>('dish_id')} = $3;
      `,
      values: [entity.order_number, entity.menu_id, entity.dish_id],
    };

    await this.query<DishInMenuEntity>(queryConfig);
    return this.getAsync(entity.menu_id, entity.dish_id);
  }

  async deleteAsync(
    entity: Pick<DishInMenuEntity, 'menu_id' | 'dish_id'>
  ): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.schema}.${this.tableName} 
        WHERE ${keyOf<DishInMenuEntity>('menu_id')} = $1 
        AND ${keyOf<DishInMenuEntity>('dish_id')} = $2;
      `,
      values: [entity.menu_id, entity.dish_id],
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  }

  async deleteByIdsAsync(dish_ids: number[]): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.schema}.${this.tableName} 
        WHERE ${keyOf<DishInMenuEntity>('dish_id')} in ($1);
      `,
      values: dish_ids,
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  }

  async deleteAllByMenuIdAsync(menu_id: number): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.schema}.${this.tableName} 
        WHERE ${keyOf<DishInMenuEntity>('menu_id')} = $1;
      `,
      values: [menu_id],
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  }

  async deleteAllByDishIdAsync(dish_id: number): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.schema}.${this.tableName} 
        WHERE ${keyOf<DishInMenuEntity>('dish_id')} = $1;
      `,
      values: [dish_id],
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  }
}
