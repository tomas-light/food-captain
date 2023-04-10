export type MakeOptional<T extends object, Key extends keyof T> = Omit<T, Key> &
  Partial<Pick<T, Key>>;
