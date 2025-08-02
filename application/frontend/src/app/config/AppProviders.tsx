import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import { ApiClientProvider } from './ApiClientProvider';
import { ApiMockConfigProvider } from './ApiMockConfigProvider';
import { ConfigJsonProvider } from './ConfigJsonProvider';
import envJson from './env.yaml.json' with { type: 'json' };
import { TranslatesProvider } from './TranslatesProvider';
import '../../../public/global.scss';
import { WindowMediaContextProvider } from './WindowMediaContextProvider';

export function AppProviders(props: PropsWithChildren) {
  const { children } = props;

  return (
    <ConfigJsonProvider configJsonUrl={envJson.configJsonUrl}>
      <ApiClientProvider>
        <TranslatesProvider>
          <ApiMockConfigProvider>
            <WindowMediaContextProvider>
              {children}

              <ReactQueryDevtools />
              <ToastContainer stacked position="bottom-center" />
            </WindowMediaContextProvider>
          </ApiMockConfigProvider>
        </TranslatesProvider>
      </ApiClientProvider>
    </ConfigJsonProvider>
  );
}
