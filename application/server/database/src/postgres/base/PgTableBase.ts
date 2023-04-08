import { QueryConfig, QueryResultRow } from 'pg';
import { Query } from './Query';

export class PgTableBase<TEntity extends QueryResultRow> extends Query {
  protected schema = 'public';
  static schema = 'public';
  protected tableName?: string;
  get table() {
    return `${this.schema}.${this.tableName}`;
  }

  allAsync = async (): Promise<TEntity[]> => {
    const queryResult = await this.query<TEntity>(
      `SELECT * from ${this.table}`
    );
    return queryResult?.rows ?? [];
  };

  byIdAsync = async (id: number): Promise<TEntity | undefined> => {
    const queryResult = await this.query<TEntity>({
      text: `SELECT * FROM ${this.table} WHERE id = $1;`,
      values: [id],
    });
    return queryResult?.rows[0];
  };

  protected makeUpdateQueryConfig(
    entity: Partial<TEntity> & { id: number }
  ): QueryConfig | undefined {
    const propertyNames = Object.keys(entity);
    if (propertyNames.length <= 1) {
      return undefined;
    }

    let parameterOrder = 1;

    const sql = Object.entries(entity).reduce(
      (sql, [propertyName, value]) => {
        sql.parameterExpression.push(`${propertyName} = $${parameterOrder++}`);
        sql.values.push(value);
        return sql;
      },
      {
        parameterExpression: [] as string[],
        values: [] as any[],
      }
    );

    return {
      text: `UPDATE ${this.table} SET ${sql.parameterExpression.join(
        ', '
      )} WHERE id = $1;`,
      values: sql.values,
    };
  }

  deleteByIdAsync = async (id: number): Promise<boolean> => {
    const queryResult = await this.query({
      text: `DELETE FROM ${this.table} WHERE id = $1;`,
      values: [id],
    });
    return (queryResult?.rowCount ?? 0) > 0;
  };
}
