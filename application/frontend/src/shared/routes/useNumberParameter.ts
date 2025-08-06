import { useMemo } from 'react';

export function useNumberParameter(value: string | undefined) {
  return useMemo(() => {
    if (value == null) {
      return value;
    }

    const numberValue = parseInt(value);
    if (isNaN(numberValue)) {
      return undefined;
    }
    return numberValue;
  }, [value]);
}
