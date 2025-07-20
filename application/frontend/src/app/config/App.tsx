import type { PropsWithChildren } from 'react';
import { ApiClientProvider } from './ApiClientProvider';
import { ConfigJsonProvider } from './ConfigJsonProvider';
import envJson from './env.yaml.json' with { type: 'json' };
import { TranslatesProvider } from './TranslatesProvider';

export function App(props: PropsWithChildren) {
  const { children } = props;

  return (
    <ConfigJsonProvider configJsonUrl={envJson.configJsonUrl}>
      <ApiClientProvider>
        <TranslatesProvider>{children}</TranslatesProvider>
      </ApiClientProvider>
    </ConfigJsonProvider>
  );
}
