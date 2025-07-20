import { type DBSchema, type IDBPDatabase, openDB, type StoreNames } from 'idb';
import type { Database } from './Database';

interface Options<Schema extends DBSchema> {
  databaseName: string;
  databaseVersion: number;
  tableNames: Array<StoreNames<Schema> & keyof Database<Schema>>;
  initialTransactions?: (idbDatabase: Database<Schema>) => void | Promise<void>;
}

export async function createDatabase<Schema extends DBSchema>(
  options: Options<Schema>
): Promise<Database<Schema>> {
  const { databaseName, databaseVersion, tableNames, initialTransactions } =
    options;

  let hasNeedUpdate: boolean = false;

  const idbDatabase = await openDB<Schema>(databaseName, databaseVersion, {
    async upgrade(idb, oldVersion, newVersion) {
      hasNeedUpdate = oldVersion != newVersion;

      for (const tableName of tableNames) {
        if (idb.objectStoreNames.contains(tableName)) {
          if (hasNeedUpdate) {
            idb.deleteObjectStore(tableName);
          } else {
            continue;
          }
        }

        idb.createObjectStore(tableName);
      }
    },
  });

  const database = mapIdbToDatabase(idbDatabase, tableNames);

  if (hasNeedUpdate) {
    await initialTransactions?.(database);
  }

  return database;
}

function mapIdbToDatabase<Schema extends DBSchema>(
  idbDatabase: IDBPDatabase<Schema>,
  tableNames: Array<StoreNames<Schema> & keyof Database<Schema>>
): Database<Schema> {
  return tableNames.reduce((database, tableName) => {
    database[tableName] = {
      getAll() {
        return idbDatabase.getAll(tableName);
      },
      get(key) {
        return idbDatabase.get(tableName, key);
      },
      insert(key, value) {
        return idbDatabase.add(tableName, value, key);
      },
      update(key, value) {
        return idbDatabase.put(tableName, value, key);
      },
      delete(key) {
        return idbDatabase.delete(tableName, key);
      },
      deleteAll() {
        return idbDatabase.clear(tableName);
      },
    };

    return database;
  }, {} as Database<Schema>);
}
