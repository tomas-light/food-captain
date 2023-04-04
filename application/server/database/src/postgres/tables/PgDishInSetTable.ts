import { QueryConfig } from 'pg';
import { DishInSetTable } from '../../tables/DishInSetTable';
import { DishInSetEntity } from '../../entities';
import { keyOf } from '../../utils';
import { PgTableBase } from '../base';

export class PgDishInSetTable
  extends PgTableBase<DishInSetEntity>
  implements DishInSetTable
{
  protected tableName = 'dish_in_set';

  // todo: possible redundant
  async getAsync(
    dish_set_id: number,
    dish_id: number
  ): Promise<DishInSetEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.schema}.${this.tableName} 
        WHERE ${keyOf<DishInSetEntity>('dish_set_id')} = $1 
        AND ${keyOf<DishInSetEntity>('dish_id')} = $2;
      `,
      values: [dish_set_id, dish_id],
    };

    const queryResult = await this.query<DishInSetEntity>(queryConfig);
    return queryResult?.rows[0];
  }

  async insertAsync(entity: DishInSetEntity): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.schema}.${this.tableName} (
          ${keyOf<DishInSetEntity>('dish_set_id')}, 
          ${keyOf<DishInSetEntity>('dish_id')} 
        ) 
        VALUES($1, $2);
      `,
      values: [entity.dish_set_id, entity.dish_id],
    };

    const queryResult = await this.query<DishInSetEntity>(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  }

  async deleteAsync(entity: DishInSetEntity): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.schema}.${this.tableName} 
        WHERE ${keyOf<DishInSetEntity>('dish_set_id')} = $1 
        AND ${keyOf<DishInSetEntity>('dish_id')} = $2;
      `,
      values: [entity.dish_set_id, entity.dish_id],
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  }
}
