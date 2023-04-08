import { Logger } from '@food-captain/server-utils';
import { Container } from 'cheap-di';
import { ClientConfig, Pool } from 'pg';
import { Database } from './Database';
import { PostgresDatabase } from './postgres';

export function registerDatabase(
  container: Container,
  dbConfig: Pick<
    ClientConfig,
    'connectionString' | 'database' | 'host' | 'port' | 'user' | 'password'
  >
) {
  let pool: Pool;
  if (dbConfig.connectionString) {
    pool = new Pool({
      connectionString: dbConfig.connectionString,
    });
  } else if (
    dbConfig.database &&
    dbConfig.host &&
    dbConfig.port &&
    dbConfig.user &&
    dbConfig.password
  ) {
    pool = new Pool({
      database: dbConfig.database,
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
    });
  } else {
    throw new Error(
      'Has no credentials to establish connection to the Database'
    );
  }

  const logger = container.resolve(Logger);
  if (!logger) {
    throw new Error('Logger cannot be resolved');
  }
  const db = new PostgresDatabase(logger, pool);
  container.registerInstance(db).as(Database);
}
