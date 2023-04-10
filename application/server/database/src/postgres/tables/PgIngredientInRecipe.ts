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
}
