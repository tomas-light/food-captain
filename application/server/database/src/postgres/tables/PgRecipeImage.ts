import { QueryConfig } from 'pg';
import { RecipeImageEntity } from '../../entities';
import { RecipeImageTable } from '../../tables/RecipeImageTable';
import { keyOf } from '../../utils';
import { PgTableBase } from '../base';

export class PgRecipeImage
  extends PgTableBase<RecipeImageEntity>
  implements RecipeImageTable
{
  protected tableName = 'recipe_image';
  static get table() {
    return `${this.schema}.recipe_image`;
  }

  // todo: possible redundant
  getAsync = async (
    recipe_id: number,
    image_id: number
  ): Promise<RecipeImageEntity | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.table} 
        WHERE ${keyOf<RecipeImageEntity>('recipe_id')} = $1 
        AND ${keyOf<RecipeImageEntity>('image_id')} = $2;
      `,
      values: [recipe_id, image_id],
    };

    const queryResult = await this.query<RecipeImageEntity>(queryConfig);
    return queryResult?.rows[0];
  };

  insertAsync = async (entity: RecipeImageEntity): Promise<boolean> => {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.table} (
          ${keyOf<RecipeImageEntity>('recipe_id')}, 
          ${keyOf<RecipeImageEntity>('image_id')} 
        ) 
        VALUES($1, $2);
      `,
      values: [entity.recipe_id, entity.image_id],
    };

    const queryResult = await this.query<RecipeImageEntity>(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };

  deleteAsync = async (entity: RecipeImageEntity): Promise<boolean> => {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.table} 
        WHERE ${keyOf<RecipeImageEntity>('recipe_id')} = $1 
        AND ${keyOf<RecipeImageEntity>('image_id')} = $2;
      `,
      values: [entity.recipe_id, entity.image_id],
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  };
}
