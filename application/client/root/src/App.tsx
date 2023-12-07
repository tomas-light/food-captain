import { ChakraProvider } from '@chakra-ui/react';
import DayjsAdapter from '@date-io/dayjs';
import { DIOneTimeProvider } from 'cheap-di-react';
import { FC, ReactElement, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { chakraTheme } from '@food-captain/client-shared';
import {
  ApiInterceptor,
  LoggedApiError,
  LoggedApiRequest,
  LoggedApiResponse,
} from '@food-captain/client-api';
import { AppInitializer } from '~/appInitializer';
import { configureTranslation } from '~/config/i18next';
import {
  TranslationContext,
  TranslationContextType,
} from '~/config/i18next/TranslationContext';
import { Layout } from '~/Layout';
import { RegisterNavigationInDI } from '~/routing/RegisterNavigationInDI';
import { configureRedux } from '~State';

const dayjsAdapter = new DayjsAdapter(); // todo: share with Chakra UI ?
configureTranslation();

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

      container.registerImplementation(ApiInterceptor).inject(
        (request: LoggedApiRequest): void => {
          // console.log('[API] request', request);
        },
        (response: LoggedApiResponse): void => {
          // console.log('[API] response', response);
        },
        (error: LoggedApiError): void => {
          console.log('[API] error', error);
        }
      );
    })();
  }, []);

  const [translationContext, setTranslationContext] =
    useState<TranslationContextType>({
      resourceLoaded: () => {
        setTranslationContext((state) => ({ ...state }));
      },
    });

  if (!config) {
    return null;
  }

  return (
    <ChakraProvider resetCSS theme={chakraTheme}>
      <Provider store={config.store}>
        <DIOneTimeProvider parentContainer={config.container}>
          <TranslationContext.Provider value={translationContext}>
            <AppInitializer>
              <Layout>{children}</Layout>
            </AppInitializer>

            <RegisterNavigationInDI container={config.container} />
          </TranslationContext.Provider>
        </DIOneTimeProvider>
      </Provider>
    </ChakraProvider>
  );
};

export { App };
