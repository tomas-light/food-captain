export type StoredDuration = {
  fcType: 'duration';
  value: string; // json
};

export function isStoredDuration(value: any): value is StoredDuration {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.fcType === 'duration' &&
    typeof value.value === 'string'
  );
}
