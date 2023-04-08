import { QueryConfig } from 'pg';
import { IngredientEntity } from '../../entities';
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

  async insertAsync(
    entity: Omit<IngredientEntity, 'id'>
  ): Promise<number | undefined> {
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
  }

  async updateAsync(
    entity: MakePropertiesOptional<IngredientEntity, 'name'>
  ): Promise<IngredientEntity | undefined> {
    const queryConfig = this.makeUpdateQueryConfig(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<IngredientEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  }
}