import type { TypeOptions } from './types/options';

const KEY_SEPARATOR = '.' satisfies TypeOptions['keySeparator'];

export function joinKeys(key1: string, key2: string) {
  return `${key1}${KEY_SEPARATOR}${key2}`;
}
export function splitKey(key: string) {
  return key.split(KEY_SEPARATOR);
}
