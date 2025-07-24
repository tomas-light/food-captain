import { type PropsWithChildren, useEffect, useState } from 'react';
import {
  type ConfigJson,
  useApiMockConfig,
  useConfigJson,
} from '~/shared/config/';

export function ApiMockConfigProvider(props: PropsWithChildren) {
  const { children } = props;

  const loadedConfig = useConfigJson();
  const loadedApiMock = loadedConfig?.mockApi;

  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  }, [loadedApiMock]);

  if (loading) {
    return null;
  }

  return children;
}
