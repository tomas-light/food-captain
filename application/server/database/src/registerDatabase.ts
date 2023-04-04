import { DependencyRegistrator } from 'cheap-di';
import { ClientConfig, Pool } from 'pg';
import { Database } from './Database';
import { PostgresDatabase } from './postgres';

export function registerDatabase(
  container: DependencyRegistrator,
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
  container.registerInstance(pool);
  container.registerType(PostgresDatabase).as(Database);
  const db = (container as any).resolve(Database);
}
