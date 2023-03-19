import { QueryConfig } from 'pg';
import { DimensionTable } from '../DimensionTable';
import { DimensionEntity } from '../entities';
import { keyOf } from '../utils';
import { PgTableBase } from './base';

interface MyI {
  prop3: string;
}

export class PgDimensionTable
  extends PgTableBase<DimensionEntity>
  implements DimensionTable
{
  protected tableName = 'dimension';

  async insertAsync(
    entity: Omit<DimensionEntity, 'id'>
  ): Promise<number | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${keyOf<DimensionEntity>('name')} 
          ${keyOf<MyI>('prop3')} 
        ) 
        VALUES($1) RETURNING ${keyOf<DimensionEntity>('id')};
      `,
      values: [entity.name],
    };

    const queryResult = await this.query<DimensionEntity>(queryConfig);
    return queryResult?.rows[0]?.id;
  }

  async updateAsync(
    entity: DimensionEntity
  ): Promise<DimensionEntity | undefined> {
    const queryConfig = this.makeUpdateQueryConfig(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<DimensionEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  }
}
