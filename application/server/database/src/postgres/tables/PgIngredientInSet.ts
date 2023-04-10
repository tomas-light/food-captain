import { QueryConfig } from 'pg';
import { IngredientInSetEntity } from '../../entities';
import { IngredientInSetTable } from '../../tables/IngredientInSetTable';
import { keyOf } from '../../utils';
import { PgTableBase } from '../base';

export class PgIngredientInSet
  extends PgTableBase<IngredientInSetEntity>
  implements IngredientInSetTable
{
  protected tableName = 'ingredient_in_set';
  static get table() {
    return `${this.schema}.ingredient_in_set`;
  }

  // todo: possible redundant
  getAsync = async (
    ingredient_set_id: number,
    ingredient_id: number
  ): Promise<IngredientInSetEntity | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.table} 
        WHERE ${keyOf<IngredientInSetEntity>('ingredient_set_id')} = $1 
        AND ${keyOf<IngredientInSetEntity>('ingredient_id')} = $2;
      `,
      values: [ingredient_set_id, ingredient_id],
    };

    const queryResult = await this.query<IngredientInSetEntity>(queryConfig);
    return queryResult?.rows[0];
  };

  insertAsync = async (entity: IngredientInSetEntity): Promise<boolean> => {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.table} (
          ${keyOf<IngredientInSetEntity>('ingredient_set_id')}, 
          ${keyOf<IngredientInSetEntity>('ingredient_id')} 
        ) 
        VALUES($1, $2);
      `,
      values: [entity.ingredient_set_id, entity.ingredient_id],
    };

    const queryResult = await this.query<IngredientInSetEntity>(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };

  deleteAsync = async (entity: IngredientInSetEntity): Promise<boolean> => {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.table} 
        WHERE ${keyOf<IngredientInSetEntity>('ingredient_id')} = $1 
        AND ${keyOf<IngredientInSetEntity>('ingredient_set_id')} = $2;
      `,
      values: [entity.ingredient_set_id, entity.ingredient_id],
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };
}
