import type { DBSchema, StoreKey, StoreNames, StoreValue } from 'idb';
import type { Table } from './Table';

export type SchemaTable<
  Schema extends DBSchema,
  StoreName extends StoreNames<Schema>,
  Key extends StoreKey<Schema, StoreName> = StoreKey<Schema, StoreName>,
  Value extends StoreValue<Schema, StoreName> = StoreValue<Schema, StoreName>,
> = Table<Key, Value>;
