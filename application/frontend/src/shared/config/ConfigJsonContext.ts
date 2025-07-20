import { createContext, useContext } from 'react';
import type { ConfigJson } from './ConfigJson';

export const ConfigJsonContext = createContext<ConfigJson | null>(null);

export function useConfigJson() {
  return useContext(ConfigJsonContext);
}
