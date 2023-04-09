export type StoredSet = {
  fcType: 'set';
  value: any[];
};

export function isStoredSet(value: any): value is StoredSet {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.fcType === 'set' &&
    Array.isArray(value.value)
  );
}
