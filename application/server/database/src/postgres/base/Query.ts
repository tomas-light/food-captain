import { Logger } from '@food-captain/server-utils';
import { Pool, QueryConfig, QueryResultRow } from 'pg';

export class Query {
  constructor(private readonly logger: Logger, private readonly pool: Pool) {}

  protected async query<Entity extends QueryResultRow>(
    queryTextOrConfig: string | QueryConfig
  ) {
    try {
      // await this.pool.connect();
      const queryResult = await this.pool.query<Entity>(queryTextOrConfig);
      // await this.pool.end();

      return queryResult;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(error.message, error.stack);
      } else {
        this.logger.error(error);
      }
    }

    return undefined;
  }
}
