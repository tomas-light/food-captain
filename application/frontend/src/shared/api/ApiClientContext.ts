import { createContext } from 'react';
import { type ApiClient } from './ApiClient';

export const ApiClientContext = createContext<ApiClient | null>(null);