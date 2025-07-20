type SerializedDate = {
  storeType: 'date';
  date: string;
};

type SerializedSet = {
  storeType: 'set';
  items: unknown[];
};

type SerializedValue = SerializedDate | SerializedSet;

export const isSerializedValue = (value: unknown): value is SerializedValue => {
  return (value as SerializedValue)?.storeType != null;
};
