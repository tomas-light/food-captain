import { API_HOST, API_SCHEMA, API_PORT } from '../environment';

export const API_BASE_URL = `${API_SCHEMA}://${API_HOST}${API_PORT ? ':' + API_PORT : ''}`;
