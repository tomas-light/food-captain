import { QueryConfig } from 'pg';
import { DishInSetTable } from '../../tables/DishInSetTable';
import { DishInSetEntity } from '../../entities';
import { keyOf } from '../../utils';
import { PgTableBase } from '../base';

export class PgDishInSet
  extends PgTableBase<DishInSetEntity>
  implements DishInSetTable
{
  protected tableName = 'dish_in_set';
  static get table() {
    return `${this.schema}.dish_in_set`;
  }

  // todo: possible redundant
  getAsync = async (
    dish_set_id: number,
    dish_id: number
  ): Promise<DishInSetEntity | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.table} 
        WHERE ${keyOf<DishInSetEntity>('dish_set_id')} = $1 
        AND ${keyOf<DishInSetEntity>('dish_id')} = $2;
      `,
      values: [dish_set_id, dish_id],
    };

    const queryResult = await this.query<DishInSetEntity>(queryConfig);
    return queryResult?.rows[0];
  };

  insertAsync = async (entity: DishInSetEntity): Promise<boolean> => {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.table} (
          ${keyOf<DishInSetEntity>('dish_set_id')}, 
          ${keyOf<DishInSetEntity>('dish_id')} 
        ) 
        VALUES($1, $2);
      `,
      values: [entity.dish_set_id, entity.dish_id],
    };

    const queryResult = await this.query<DishInSetEntity>(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };

  deleteAsync = async (entity: DishInSetEntity): Promise<boolean> => {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.table} 
        WHERE ${keyOf<DishInSetEntity>('dish_set_id')} = $1 
        AND ${keyOf<DishInSetEntity>('dish_id')} = $2;
      `,
      values: [entity.dish_set_id, entity.dish_id],
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };
}
