/** for type checking in DataBse operations
 * @example
 * query(`Select where ${keyof<MyEntity>('entityPropName')}`);
 * */
export function keyOf<T extends object>(propertyName: keyof T) {
  return propertyName;
}
