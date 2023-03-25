import { DependencyRegistrator } from 'cheap-di';
import { ClientConfig, Pool } from 'pg';
import { Database } from './Database';
import { PostgresDatabase } from './postgres';

export function registerDatabase(
  container: DependencyRegistrator,
  dbConfig: Pick<ClientConfig, 'connectionString'>
) {
  container.registerInstance(
    new Pool({
      connectionString: dbConfig.connectionString,
    })
  );
  container.registerType(PostgresDatabase).as(Database);
}
