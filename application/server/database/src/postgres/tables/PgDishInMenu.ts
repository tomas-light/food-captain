import { QueryConfig } from 'pg';
import { DishInMenuTable } from '../../tables/DishInMenuTable';
import { DishInMenuEntity } from '../../entities';
import { keyOf } from '../../utils';
import { PgTableBase } from '../base';

export class PgDishInMenu
  extends PgTableBase<DishInMenuEntity>
  implements DishInMenuTable
{
  protected tableName = 'dish_in_menu';
  static get table() {
    return `${this.schema}.dish_in_menu`;
  }

  getAsync = async (
    menu_id: number,
    dish_id: number
  ): Promise<DishInMenuEntity | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.table} 
        WHERE ${keyOf<DishInMenuEntity>('menu_id')} = $1 
        AND ${keyOf<DishInMenuEntity>('recipe_id')} = $2;
      `,
      values: [menu_id, dish_id],
    };

    const queryResult = await this.query<DishInMenuEntity>(queryConfig);
    return queryResult?.rows[0];
  };

  insertAsync = async (entity: DishInMenuEntity): Promise<boolean> => {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.table} (
          ${keyOf<DishInMenuEntity>('menu_id')}, 
          ${keyOf<DishInMenuEntity>('recipe_id')}, 
          ${keyOf<DishInMenuEntity>('order_number')} 
        ) 
        VALUES($1, $2, $3);
      `,
      values: [entity.menu_id, entity.recipe_id, entity.order_number],
    };

    const queryResult = await this.query<DishInMenuEntity>(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };

  updateAsync = async (
    entity: DishInMenuEntity
  ): Promise<DishInMenuEntity | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        UPDATE ${this.table} 
        SET ${keyOf<DishInMenuEntity>('order_number')} = $1 
        WHERE ${keyOf<DishInMenuEntity>('menu_id')} = $2 
        AND ${keyOf<DishInMenuEntity>('recipe_id')} = $3;
      `,
      values: [entity.order_number, entity.menu_id, entity.recipe_id],
    };

    await this.query<DishInMenuEntity>(queryConfig);
    return this.getAsync(entity.menu_id, entity.recipe_id);
  };

  deleteAsync = async (
    entity: Pick<DishInMenuEntity, 'menu_id' | 'recipe_id'>
  ): Promise<boolean> => {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.table} 
        WHERE ${keyOf<DishInMenuEntity>('menu_id')} = $1 
        AND ${keyOf<DishInMenuEntity>('recipe_id')} = $2;
      `,
      values: [entity.menu_id, entity.recipe_id],
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };

  deleteByIdsAsync = async (recipe_ids: number[]): Promise<boolean> => {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.table} 
        WHERE ${keyOf<DishInMenuEntity>('recipe_id')} in ($1);
      `,
      values: recipe_ids,
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };

  deleteAllByMenuIdAsync = async (menu_id: number): Promise<boolean> => {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.table} 
        WHERE ${keyOf<DishInMenuEntity>('menu_id')} = $1;
      `,
      values: [menu_id],
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };

  deleteAllByDishIdAsync = async (recipe_id: number): Promise<boolean> => {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.table} 
        WHERE ${keyOf<DishInMenuEntity>('recipe_id')} = $1;
      `,
      values: [recipe_id],
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };
}
