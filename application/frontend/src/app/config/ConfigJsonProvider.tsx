import { type PropsWithChildren, useEffect, useState } from 'react';
import type { ConfigJson } from '~/shared/config/ConfigJson';
import { ConfigJsonContext } from '~/shared/config/ConfigJsonContext';

type Props = PropsWithChildren<{
  configJsonUrl: string;
}>;

export function ConfigJsonProvider(props: Props) {
  const { configJsonUrl, children } = props;

  const [loadedConfig, setLoadedConfig] = useState<ConfigJson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const response = await fetch(configJsonUrl);
      const configJson = await response.json();
      setLoadedConfig(configJson);
      setLoading(false);
    })();
  }, [configJsonUrl]);

  if (loading) {
    // todo: add spinner
    return null;
  }

  return (
    <ConfigJsonContext.Provider value={loadedConfig}>
      {children}
    </ConfigJsonContext.Provider>
  );
}
