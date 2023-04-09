export type StoredDate = {
  fcType: 'date';
  value: string;
};

export function isStoredDate(value: any): value is StoredDate {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.fcType === 'date' &&
    typeof value.value === 'string'
  );
}
