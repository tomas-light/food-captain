import { QueryConfig } from 'pg';
import { IngredientInRecipeEntity } from '../../entities';
import { IngredientInRecipeTable } from '../../tables/IngredientInRecipeTable';
import { keyOf } from '../../utils';
import { PgTableBase } from '../base';

export class PgIngredientInRecipe
  extends PgTableBase<IngredientInRecipeEntity>
  implements IngredientInRecipeTable
{
  protected tableName = 'ingredient_in_recipe';
  static get table() {
    return `${this.schema}.ingredient_in_recipe`;
  }

  getByRecipeIdAsync = async (
    recipe_id: number
  ): Promise<IngredientInRecipeEntity[]> => {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.table} 
        WHERE ${keyOf<IngredientInRecipeEntity>('recipe_id')} = $1;
      `,
      values: [recipe_id],
    };

    const queryResult = await this.query<IngredientInRecipeEntity>(queryConfig);
    return queryResult?.rows ?? [];
  };

  getAsync = async (
    recipe_id: number,
    ingredient_id: number
  ): Promise<IngredientInRecipeEntity | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.table} 
        WHERE ${keyOf<IngredientInRecipeEntity>('recipe_id')} = $1 
        AND ${keyOf<IngredientInRecipeEntity>('ingredient_id')} = $2;
      `,
      values: [recipe_id, ingredient_id],
    };

    const queryResult = await this.query<IngredientInRecipeEntity>(queryConfig);
    return queryResult?.rows[0];
  };

  insertAsync = async (entity: IngredientInRecipeEntity): Promise<boolean> => {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.table} (
          ${keyOf<IngredientInRecipeEntity>('recipe_id')}, 
          ${keyOf<IngredientInRecipeEntity>('ingredient_id')}, 
          ${keyOf<IngredientInRecipeEntity>('dimension_id')}, 
          ${keyOf<IngredientInRecipeEntity>('size')} 
        ) 
        VALUES($1, $2, $3, $4);
      `,
      values: [
        entity.recipe_id,
        entity.ingredient_id,
        entity.dimension_id,
        entity.size,
      ],
    };

    const queryResult = await this.query<IngredientInRecipeEntity>(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };

  insertMultipleAsync = async (
    entities: IngredientInRecipeEntity[]
  ): Promise<boolean> => {
    let parameterOrder = 1;

    const { parameterExpression, values } = entities.reduce(
      (sql, entity) => {
        const parameterExpression: string[] = [
          `$${parameterOrder++}`, // recipe_id
          `$${parameterOrder++}`, // ingredient_id
          `$${parameterOrder++}`, // dimension_id
          `$${parameterOrder++}`, // size
        ];
        const values = [
          entity.recipe_id,
          entity.ingredient_id,
          entity.dimension_id,
          entity.size,
        ];

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
          ${keyOf<IngredientInRecipeEntity>('recipe_id')}, 
          ${keyOf<IngredientInRecipeEntity>('ingredient_id')}, 
          ${keyOf<IngredientInRecipeEntity>('dimension_id')}, 
          ${keyOf<IngredientInRecipeEntity>('size')} 
        ) 
        VALUES ${parameterExpression.join(',')};
      `,
      values: values,
    };

    const queryResult = await this.query<IngredientInRecipeEntity>(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };

  updateAsync = async (
    entity: IngredientInRecipeEntity
  ): Promise<IngredientInRecipeEntity | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        UPDATE ${this.table} 
        SET ${keyOf<IngredientInRecipeEntity>('dimension_id')} = $1, 
          ${keyOf<IngredientInRecipeEntity>('size')} = $2 
        WHERE ${keyOf<IngredientInRecipeEntity>('recipe_id')}  = $3 
        AND ${keyOf<IngredientInRecipeEntity>('ingredient_id')}  = $4;
      `,
      values: [
        entity.dimension_id,
        entity.size,
        entity.recipe_id,
        entity.ingredient_id,
      ],
    };

    await this.query<IngredientInRecipeEntity>(queryConfig);
    return this.getAsync(entity.recipe_id, entity.ingredient_id);
  };

  deleteAsync = async (
    entity: Pick<IngredientInRecipeEntity, 'recipe_id' | 'ingredient_id'>
  ): Promise<boolean> => {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.table} 
        WHERE ${keyOf<IngredientInRecipeEntity>('recipe_id')} = $1 
        AND ${keyOf<IngredientInRecipeEntity>('ingredient_id')} = $2;
      `,
      values: [entity.recipe_id, entity.ingredient_id],
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };

  deleteMultipleAsync = async (
    recipe_id: number,
    ingredient_ids: number[]
  ): Promise<boolean> => {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.table} 
        WHERE ${keyOf<IngredientInRecipeEntity>('recipe_id')} = $1 
        AND ${keyOf<IngredientInRecipeEntity>('ingredient_id')} in ($2);
      `,
      values: [recipe_id, ingredient_ids],
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };
}
