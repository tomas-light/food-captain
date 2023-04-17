import { QueryConfig } from 'pg';
import { IngredientEntity, NewIngredientEntity } from '../../entities';
import { IngredientTable } from '../../tables/IngredientTable';
import { keyOf, MakePropertiesOptional } from '../../utils';
import { PgTableBase } from '../base';

export class PgIngredient
  extends PgTableBase<IngredientEntity>
  implements IngredientTable
{
  protected tableName = 'ingredient';
  static get table() {
    return `${this.schema}.ingredient`;
  }

  byIdsAsync = async (ids: number[]): Promise<IngredientEntity[]> => {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.table} 
        WHERE ${keyOf<IngredientEntity>('id')} in ($1);
      `,
      values: ids,
    };

    const queryResult = await this.query<IngredientEntity>(queryConfig);
    return queryResult?.rows ?? [];
  };

  insertAsync = async (
    entity: Omit<IngredientEntity, 'id'>
  ): Promise<number | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.table} (
          ${keyOf<IngredientEntity>('name')}, 
          ${keyOf<IngredientEntity>('image_id')} 
        ) 
        VALUES($1, $2) RETURNING ${keyOf<IngredientEntity>('id')};
      `,
      values: [entity.name, entity.image_id],
    };

    const queryResult = await this.query<IngredientEntity>(queryConfig);
    return queryResult?.rows[0]?.id;
  };

  insertMultipleAsync = async (
    entities: NewIngredientEntity[]
  ): Promise<number[]> => {
    let parameterOrder = 1;

    const { parameterExpression, values } = entities.reduce(
      (sql, entity) => {
        const parameterExpression: string[] = [
          `$${parameterOrder++}`, // name
          `$${parameterOrder++}`, // image_id
        ];
        const values = [entity.name, entity.image_id];

        sql.parameterExpression.push(`(${parameterExpression.join(',')})`);
        sql.values.push(...values);
        return sql;
      },
      {
        parameterExpression: [] as string[],
        values: [] as any[],
      }
    );

    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.table} (
          ${keyOf<IngredientEntity>('name')}, 
          ${keyOf<IngredientEntity>('image_id')} 
        ) 
        VALUES 
            ${parameterExpression.join(',')}
        RETURNING ${keyOf<IngredientEntity>('id')};
      `,
      values: values,
    };

    const queryResult = await this.query<IngredientEntity>(queryConfig);
    return queryResult?.rows?.map((row) => row.id) ?? [];
  };

  updateAsync = async (
    entity: MakePropertiesOptional<IngredientEntity, 'name'>
  ): Promise<IngredientEntity | undefined> => {
    const queryConfig = this.makeUpdateQueryConfig(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<IngredientEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  };
}
