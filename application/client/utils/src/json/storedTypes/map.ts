export type StoredMap = {
  fcType: 'map';
  value: [any, any][];
};

export function isStoredMap(value: any): value is StoredMap {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.fcType === 'map' &&
    Array.isArray(value.value)
  );
}
