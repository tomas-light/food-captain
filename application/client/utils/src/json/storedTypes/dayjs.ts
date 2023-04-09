export type StoredDayjs = {
  fcType: 'dayjs';
  value: string;
};

export function isStoredDayjs(value: any): value is StoredDayjs {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.fcType === 'dayjs' &&
    typeof value.value === 'string'
  );
}
