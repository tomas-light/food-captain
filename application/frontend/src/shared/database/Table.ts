export type Table<Key, Value> = {
  getAll(): Promise<Value[]>;

  get(key: Key): Promise<Value | undefined>;

  insert(key: Key, value: Value): Promise<Key>;

  update(key: Key, value: Value): Promise<Key | undefined>;

  delete(key: Key): Promise<void>;

  deleteAll(): Promise<void>;
};
