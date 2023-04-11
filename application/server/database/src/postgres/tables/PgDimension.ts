import { QueryConfig } from 'pg';
import { DimensionEntity } from '../../entities';
import { DimensionTable } from '../../tables/DimensionTable';
import { keyOf } from '../../utils';
import { PgTableBase } from '../base';

export class PgDimension
  extends PgTableBase<DimensionEntity>
  implements DimensionTable
{
  protected tableName = 'dimension';
  static get table() {
    return `${this.schema}.dimension`;
  }

  byIdsAsync = async (ids: number[]): Promise<DimensionEntity[]> => {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.table} 
        WHERE ${keyOf<DimensionEntity>('id')} in ($1);
      `,
      values: ids,
    };

    const queryResult = await this.query<DimensionEntity>(queryConfig);
    return queryResult?.rows ?? [];
  };

  insertAsync = async (
    entity: Omit<DimensionEntity, 'id'>
  ): Promise<number | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.table} (
          ${keyOf<DimensionEntity>('name')}
        ) 
        VALUES($1) RETURNING ${keyOf<DimensionEntity>('id')};
      `,
      values: [entity.name],
    };

    const queryResult = await this.query<DimensionEntity>(queryConfig);
    return queryResult?.rows[0]?.id;
  };

  updateAsync = async (
    entity: DimensionEntity
  ): Promise<DimensionEntity | undefined> => {
    const queryConfig = this.makeUpdateQueryConfig(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<DimensionEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  };
}
