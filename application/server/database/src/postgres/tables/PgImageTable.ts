import { QueryConfig } from 'pg';
import { ImageEntity } from '../../entities';
import { ImageTable } from '../../tables/ImageTable';
import { keyOf } from '../../utils';
import { PgTableBase } from '../base';

export class PgImageTable
  extends PgTableBase<ImageEntity>
  implements ImageTable
{
  protected tableName = 'image';

  async insertAsync(
    entity: Omit<ImageEntity, 'id'>
  ): Promise<number | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${keyOf<ImageEntity>('content')} 
        ) 
        VALUES($1) RETURNING ${keyOf<ImageEntity>('id')};
      `,
      values: [entity.content],
    };

    const queryResult = await this.query<ImageEntity>(queryConfig);
    return queryResult?.rows[0]?.id;
  }

  async updateAsync(entity: ImageEntity): Promise<ImageEntity | undefined> {
    const queryConfig = this.makeUpdateQueryConfig(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<ImageEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  }
}
