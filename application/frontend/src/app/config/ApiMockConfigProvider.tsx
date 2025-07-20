import { type PropsWithChildren, useEffect } from 'react';
import {
  type ConfigJson,
  useApiMockConfig,
  useConfigJson,
} from '~/shared/config/index';

export function ApiMockConfigProvider(props: PropsWithChildren) {
  const { children } = props;

  const loadedConfig = useConfigJson();
  const loadedApiMock = loadedConfig?.mockApi;

  useEffect(() => {
    if (!loadedApiMock) {
      return;
    }

    const initialConfig = useApiMockConfig.getState();

    const config = {} as ConfigJson['mockApi'];

    for (const key in loadedApiMock) {
      const typedKey = key as keyof ConfigJson['mockApi'];

      const loaded = loadedApiMock[typedKey];
      const initial = initialConfig[typedKey];
      config[typedKey] = initial ?? loaded;
    }

    useApiMockConfig.setState(config);
  }, [loadedApiMock]);

  return children;
}
