import { useBoolean } from '@chakra-ui/react';

export function useToggler(initialValue = false) {
  return useBoolean(initialValue);
}
