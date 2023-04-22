import { QueryConfig } from 'pg';
import { NewTagEntity, TagEntity } from '../../entities';
import { TagTable } from '../../tables/TagTable';
import { keyOf } from '../../utils';
import { PgTableBase } from '../base';

export class PgTag extends PgTableBase<TagEntity> implements TagTable {
  protected tableName = 'tag';
  static get table() {
    return `${this.schema}.tag`;
  }

  byIdsAsync = async (ids: number[]): Promise<TagEntity[]> => {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.table} 
        WHERE ${keyOf<TagEntity>('id')} in ($1);
      `,
      values: ids,
    };

    const queryResult = await this.query<TagEntity>(queryConfig);
    return queryResult?.rows ?? [];
  };

  insertAsync = async (
    entity: Omit<TagEntity, 'id'>
  ): Promise<number | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.table} (
          ${keyOf<TagEntity>('name')},
          ${keyOf<TagEntity>('color')}
        ) 
        VALUES($1, $2) RETURNING ${keyOf<TagEntity>('id')};
      `,
      values: [entity.name, entity.color],
    };

    const queryResult = await this.query<TagEntity>(queryConfig);
    return queryResult?.rows[0]?.id;
  };

  insertMultipleAsync = async (entities: NewTagEntity[]): Promise<number[]> => {
    let parameterOrder = 1;

    const { parameterExpression, values } = entities.reduce(
      (sql, entity) => {
        const parameterExpression: string[] = [
          `$${parameterOrder++}`, // name
          `$${parameterOrder++}`, // color
        ];
        const values = [entity.name, entity.color];

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
          ${keyOf<TagEntity>('name')},
          ${keyOf<TagEntity>('color')}
        ) 
        VALUES 
            ${parameterExpression.join(',')}
        RETURNING ${keyOf<TagEntity>('id')};
      `,
      values: values,
    };

    const queryResult = await this.query<TagEntity>(queryConfig);
    return queryResult?.rows?.map((row) => row.id) ?? [];
  };

  updateAsync = async (entity: TagEntity): Promise<TagEntity | undefined> => {
    const queryConfig = this.makeUpdateQueryConfig(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<TagEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  };
}
