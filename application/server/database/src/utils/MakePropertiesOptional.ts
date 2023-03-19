export type MakePropertiesOptional<
  T extends object,
  Properties extends keyof T
> = Omit<T, Properties> & Partial<Pick<T, Properties>>;
