import { QueryConfig } from 'pg';
import { RecipeTagEntity } from '../../entities';
import { RecipeTagTable } from '../../tables';
import { keyOf } from '../../utils';
import { PgTableBase } from '../base';

export class PgRecipeTag
  extends PgTableBase<RecipeTagEntity>
  implements RecipeTagTable
{
  protected tableName = 'recipe_tag';
  static get table() {
    return `${this.schema}.recipe_tag`;
  }

  getByRecipeIdAsync = async (recipeId: number): Promise<RecipeTagEntity[]> => {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.table} 
        WHERE ${keyOf<RecipeTagEntity>('recipe_id')} = $1;
      `,
      values: [recipeId],
    };

    const queryResult = await this.query<RecipeTagEntity>(queryConfig);
    return queryResult?.rows ?? [];
  };

  insertAsync = async (entity: RecipeTagEntity): Promise<boolean> => {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.table} (
          ${keyOf<RecipeTagEntity>('recipe_id')}, 
          ${keyOf<RecipeTagEntity>('tag_id')} 
        ) 
        VALUES($1, $2);
      `,
      values: [entity.recipe_id, entity.tag_id],
    };

    const queryResult = await this.query<RecipeTagEntity>(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };

  insertMultipleAsync = async (
    entities: RecipeTagEntity[]
  ): Promise<boolean> => {
    let parameterOrder = 1;

    const { parameterExpression, values } = entities.reduce(
      (sql, entity) => {
        const parameterExpression: string[] = [
          `$${parameterOrder++}`, // recipe_id
          `$${parameterOrder++}`, // tag_id
        ];
        const values = [entity.recipe_id, entity.tag_id];

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
          ${keyOf<RecipeTagEntity>('recipe_id')}, 
          ${keyOf<RecipeTagEntity>('tag_id')} 
        ) 
        VALUES ${parameterExpression.join(',')};
      `,
      values: values,
    };

    const queryResult = await this.query<RecipeTagEntity>(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };

  deleteAsync = async (entity: RecipeTagEntity): Promise<boolean> => {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.table} 
        WHERE ${keyOf<RecipeTagEntity>('recipe_id')} = $1 
        AND ${keyOf<RecipeTagEntity>('tag_id')} = $2;
      `,
      values: [entity.recipe_id, entity.tag_id],
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };

  deleteMultipleAsync = async (
    recipe_id: number,
    tag_ids: number[]
  ): Promise<boolean> => {
    // todo: does not work =(
    // const queryConfig: QueryConfig = {
    //   text: `
    //     DELETE FROM ${this.table}
    //     WHERE ${keyOf<RecipeTagEntity>('recipe_id')} = $1
    //     AND ${keyOf<RecipeTagEntity>('tag_id')} in ($2);
    //   `,
    //   // second array does not work as argument
    //   values: [recipe_id, tag_ids],
    // };

    // temp protection from SQL injection
    if (typeof recipe_id !== 'number') {
      throw new Error(`recipe_id is not a number! (${recipe_id})`);
    }

    if (tag_ids.some((id) => typeof id !== 'number')) {
      throw new Error(`some tag_id is not a number! (${tag_ids})`);
    }

    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.table} 
        WHERE ${keyOf<RecipeTagEntity>('recipe_id')} = ${recipe_id} 
        AND ${keyOf<RecipeTagEntity>('tag_id')} in (${tag_ids.join(',')});
      `,
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };
}
