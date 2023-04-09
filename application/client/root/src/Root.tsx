import { ChakraProvider } from '@chakra-ui/react';
import DayjsAdapter from '@date-io/dayjs';
import { container } from 'cheap-di';
import { DIOneTimeProvider, use } from 'cheap-di-react';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { Button } from '@food-captain/client-shared';
import { LocaleApi } from '@food-captain/client-api/src/LocaleApi';
import {
  ApiInterceptor,
  LoggedApiError,
  LoggedApiRequest,
  LoggedApiResponse,
  UserApi,
} from '@food-captain/client-api';
import { UserWithRoleDto } from '@food-captain/api';
import { AppInitializer } from '~/appInitializer';
import { configureTranslation, useButtonsLocale } from './config/i18next';
import { configureRedux } from './config/redux';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Cant find element with id "root"');
}

const dayjsAdapter = new DayjsAdapter(); // todo: share with Chakra UI ?
configureTranslation();

const root = createRoot(rootElement);
root.render(<Root />);

function Root() {
  const [config, setConfig] = useState<Awaited<
    ReturnType<typeof configureRedux>
  > | null>(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    (async () => {
      const _config = await configureRedux();
      setConfig(_config);
    })();
  }, []);

  if (!config) {
    return null;
  }

  return (
    <ChakraProvider resetCSS>
      <Provider store={config.store}>
        <DIOneTimeProvider parentContainer={container}>
          <AppInitializer>
            <SomePage />
          </AppInitializer>
        </DIOneTimeProvider>
      </Provider>
    </ChakraProvider>
  );
}

function SomePage() {
  const userApi = use(UserApi);
  const { t } = useTranslation();
  useButtonsLocale();
  const [areUsersLoading, setAreUsersLoading] = useState(false);

  const [users, setUsers] = useState<UserWithRoleDto[]>([]);
  useEffect(() => {
    // fetch('https://api.food-captain.localhost/check');
  }, []);

  return (
    <div>
      <p>Hello Food Captain!</p>

      <Button
        state={{
          loading: areUsersLoading,
        }}
        onClick={async () => {
          setAreUsersLoading(true);
          const response = await userApi.getUsersAsync();
          if (response.isFailed() || !response.data) {
            setUsers([]);
          } else {
            setUsers(response.data);
          }
          setAreUsersLoading(false);
        }}
      >
        {t('buttons.open')}
      </Button>

      {users &&
        Array.isArray(users) &&
        users.map((user) => (
          <p key={JSON.stringify(user)}>{JSON.stringify(user, null, 2)}</p>
        ))}
    </div>
  );
}
