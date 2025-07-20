import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { PropsWithChildren } from 'react';
import { ApiClientProvider } from './ApiClientProvider';
import { ApiMockConfigProvider } from './ApiMockConfigProvider';
import { ConfigJsonProvider } from './ConfigJsonProvider';
import envJson from './env.yaml.json' with { type: 'json' };
import { TranslatesProvider } from './TranslatesProvider';
import '../../../public/global.scss';

export function App(props: PropsWithChildren) {
  const { children } = props;

  return (
    <ConfigJsonProvider configJsonUrl={envJson.configJsonUrl}>
      <ApiClientProvider>
        <TranslatesProvider>
          <ApiMockConfigProvider>
            {children}

            <ReactQueryDevtools />
          </ApiMockConfigProvider>
        </TranslatesProvider>
      </ApiClientProvider>
    </ConfigJsonProvider>
  );
}
