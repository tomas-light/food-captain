import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import DayjsAdapter from '@date-io/dayjs';
import { DIOneTimeProvider } from 'cheap-di-react';
import { FC, ReactElement, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { theme } from '@food-captain/client-shared';
import {
  ApiInterceptor,
  LocaleApi,
  LoggedApiError,
  LoggedApiRequest,
  LoggedApiResponse,
  UserApi,
} from '@food-captain/client-api';
import { AppInitializer } from '~/appInitializer';
import { configureTranslation } from '~/config/i18next';
import { Layout } from '~/Layout';
import { RegisterNavigationInDI } from '~/routing/RegisterNavigationInDI';
import { configureRedux } from './config/redux';

const dayjsAdapter = new DayjsAdapter(); // todo: share with Chakra UI ?
configureTranslation();

const extendedTheme = extendTheme({
  colors: {
    ...theme.colors,
  },
});

const App: FC<{ children: ReactElement }> = (props) => {
  const { children } = props;
  const [config, setConfig] = useState<Awaited<
    ReturnType<typeof configureRedux>
  > | null>(null);

  useEffect(() => {
    (async () => {
      const _config = await configureRedux();
      setConfig(_config);

      const { container } = _config;

      container.registerType(ApiInterceptor).with(
        (request: LoggedApiRequest): void => {
          console.log('[API] request', request);
        },
        (response: LoggedApiResponse): void => {
          console.log('[API] response', response);
        },
        (error: LoggedApiError): void => {
          console.log('[API] error', error);
        }
      );
      // todo: hack, type metadata is not emitted somehow...
      const interceptor = container.resolve(ApiInterceptor);
      container.registerType(UserApi).with(interceptor);
      container.registerType(LocaleApi).with(interceptor);
    })();
  }, []);

  if (!config) {
    return null;
  }

  return (
    <ChakraProvider resetCSS theme={extendedTheme}>
      <Provider store={config.store}>
        <DIOneTimeProvider parentContainer={config.container}>
          <AppInitializer>
            <Layout>{children}</Layout>
          </AppInitializer>

          <RegisterNavigationInDI container={config.container} />
        </DIOneTimeProvider>
      </Provider>
    </ChakraProvider>
  );
};

export { App };
