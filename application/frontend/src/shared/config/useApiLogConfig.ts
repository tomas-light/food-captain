import { createStore } from '../store/';

const useApiLogConfig = createStore(
  {
    shouldLogApi: true,
  },
  {
    name: 'api-log-config',
  }
);

export function useShouldLogApi() {
  return useApiLogConfig((state) => state.shouldLogApi);
}

export function getShouldLogApi() {
  return useApiLogConfig.getState().shouldLogApi;
}

export function toggleShouldLogApi() {
  useApiLogConfig.setState((prevState) => ({
    ...prevState,
    shouldLogApi: !prevState.shouldLogApi,
  }));
}
