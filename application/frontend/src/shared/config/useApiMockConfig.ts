import { createStore } from '../store/';
import type { ConfigJson } from './ConfigJson';

type ApiMockConfig = ConfigJson['mockApi'];

export const useApiMockConfig = createStore<Partial<ApiMockConfig>>(
  {},
  {
    name: 'api-mocks',
  }
);

export function useAreAllMocksEnabled() {
  return useApiMockConfig((state) => {
    if (Object.keys(state).length === 0) {
      return false;
    }

    for (const apiName in state) {
      const shouldMockApi = state[apiName as keyof ApiMockConfig];
      if (!shouldMockApi) {
        return false;
      }
    }

    return true;
  });
}

export function enableAllMocks() {
  setAllMockApiTo(true);
}

export function disableAllMocks() {
  setAllMockApiTo(false);
}

export function getMockApiConfig<ApiName extends keyof ApiMockConfig>(
  apiName: ApiName
) {
  return useApiMockConfig.getState()[apiName];
}

function setAllMockApiTo(desiredValue: boolean) {
  useApiMockConfig.setState((state) => {
    const newState = {} as ApiMockConfig;

    for (const apiName in state) {
      newState[apiName as keyof ApiMockConfig] = desiredValue;
    }

    return newState;
  });
}
