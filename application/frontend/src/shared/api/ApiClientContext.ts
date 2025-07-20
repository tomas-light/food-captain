import { createContext, useContext } from 'react';
import { type ApiClient } from './ApiClient';

export const ApiClientContext = createContext<ApiClient | null>(null);
export const useApiClient = () => useContext(ApiClientContext);
