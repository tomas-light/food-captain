import { QueryConfig } from 'pg';
import { ImageEntity } from '../../entities';
import { ImageTable } from '../../tables/ImageTable';
import { keyOf } from '../../utils';
import { PgTableBase } from '../base';

export class PgImage extends PgTableBase<ImageEntity> implements ImageTable {
  protected tableName = 'image';
  static get table() {
    return `${this.schema}.image`;
  }

  allShortInfoAsync = async (): Promise<Pick<ImageEntity, 'id' | 'tags'>[]> => {
    const queryResult = await this.query<Pick<ImageEntity, 'id' | 'tags'>>(
      `SELECT id, tags from ${this.table}`
    );
    return queryResult?.rows ?? [];
  };

  insertAsync = async (
    entity: Omit<ImageEntity, 'id'>
  ): Promise<number | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.table} (
          ${keyOf<ImageEntity>('content')}, 
          ${keyOf<ImageEntity>('file_name')}, 
          ${keyOf<ImageEntity>('mime_type')}, 
          ${keyOf<ImageEntity>('tags')} 
        ) 
        VALUES($1, $2, $3, $4) RETURNING ${keyOf<ImageEntity>('id')};
      `,
      values: [entity.content, entity.file_name, entity.mime_type, entity.tags],
    };

    const queryResult = await this.query<ImageEntity>(queryConfig);
    return queryResult?.rows[0]?.id;
  };

  updateAsync = async (
    entity: ImageEntity
  ): Promise<ImageEntity | undefined> => {
    const queryConfig = this.makeUpdateQueryConfig(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<ImageEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  };
}
