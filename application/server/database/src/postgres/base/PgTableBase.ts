import { QueryConfig, QueryResultRow } from 'pg';
import { Query } from './Query';

export class PgTableBase<TEntity extends QueryResultRow> extends Query {
  protected schema = 'public';
  protected tableName?: string;

  allAsync = async (): Promise<TEntity[]> => {
    const queryResult = await this.query<TEntity>(
      `SELECT * from ${this.schema}.${this.tableName}`
    );
    return queryResult?.rows ?? [];
  };

  byIdAsync = async (id: number): Promise<TEntity | undefined> => {
    const queryResult = await this.query<TEntity>({
      text: `SELECT * FROM ${this.schema}.${this.tableName} WHERE id = $1;`,
      values: [id],
    });
    return queryResult?.rows[0];
  };

  protected makeUpdateQueryConfig(
    entity: Partial<TEntity> & { id: number }
  ): QueryConfig<(keyof TEntity)[]> | undefined {
    const propertyNames = Object.keys(entity);
    if (propertyNames.length <= 1) {
      return undefined;
    }

    const values: any[] = [entity.id];
    const params: string[] = [];
    let valueNumber = values.length + 1;

    // todo: try to remember what is going on and improve this code to use Object.entries(entity)
    propertyNames.forEach((propertyName) => {
      values.push(entity[propertyName]);
      params.push(`${propertyName} = $${valueNumber++}`);
    });

    return {
      text: `UPDATE ${this.schema}.${this.tableName} SET ${params.join(
        ', '
      )} WHERE id = $1;`,
      values,
    };
  }

  deleteByIdAsync = async (id: number): Promise<boolean> => {
    const queryResult = await this.query({
      text: `DELETE FROM ${this.schema}.${this.tableName} WHERE id = $1;`,
      values: [id],
    });
    return (queryResult?.rowCount ?? 0) > 0;
  };
}
