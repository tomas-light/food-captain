import { QueryConfig } from 'pg';
import { RecipeImageEntity } from '../../entities';
import { RecipeImageTable } from '../../tables/RecipeImageTable';
import { keyOf } from '../../utils';
import { PgTableBase } from '../base';

export class PgRecipeImageTable
  extends PgTableBase<RecipeImageEntity>
  implements RecipeImageTable
{
  protected tableName = 'recipe_image';

  // todo: possible redundant
  async getAsync(
    recipe_id: number,
    image_id: number
  ): Promise<RecipeImageEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.schema}.${this.tableName} 
        WHERE ${keyOf<RecipeImageEntity>('recipe_id')} = $1 
        AND ${keyOf<RecipeImageEntity>('image_id')} = $2;
      `,
      values: [recipe_id, image_id],
    };

    const queryResult = await this.query<RecipeImageEntity>(queryConfig);
    return queryResult?.rows[0];
  }

  async insertAsync(entity: RecipeImageEntity): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.schema}.${this.tableName} (
          ${keyOf<RecipeImageEntity>('recipe_id')}, 
          ${keyOf<RecipeImageEntity>('image_id')} 
        ) 
        VALUES($1, $2);
      `,
      values: [entity.recipe_id, entity.image_id],
    };

    const queryResult = await this.query<RecipeImageEntity>(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  }

  async deleteAsync(entity: RecipeImageEntity): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.schema}.${this.tableName} 
        WHERE ${keyOf<RecipeImageEntity>('recipe_id')} = $1 
        AND ${keyOf<RecipeImageEntity>('image_id')} = $2;
      `,
      values: [entity.recipe_id, entity.image_id],
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  }
}
