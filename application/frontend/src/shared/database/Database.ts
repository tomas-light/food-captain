import type { DBSchema, StoreNames } from 'idb';
import type { SchemaTable } from './SchemaTable';

/**
 * @example
 * db.client.getAll()
 * db.client.get(client.id)
 * db.client.insert(client.id, client)
 * db.client.update(client.id, client)
 * db.client.delete(client.id)
 * db.client.deleteAll()
 * */
export type Database<Schema extends DBSchema> = {
  [tableName in StoreNames<Schema> extends infer Name
    ? Name extends string
      ? Name
      : never
    : never]: SchemaTable<Schema, tableName>;
};
