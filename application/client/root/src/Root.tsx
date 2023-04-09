import { ChakraProvider } from '@chakra-ui/react';
import { UserWithRoleDto } from '@food-captain/api';
import {
  ApiInterceptor,
  LoggedApiError,
  LoggedApiRequest,
  LoggedApiResponse,
  UserApi,
} from '@food-captain/client-api';
import { LocaleApi } from '@food-captain/client-api/src/LocaleApi';
import { Button } from '@food-captain/client-shared';
import { container } from 'cheap-di';
import { DIOneTimeProvider, use } from 'cheap-di-react';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useTranslation } from 'react-i18next';
import { configureTranslation, useButtonsLocale } from './config/i18next';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Cant find element with id "root"');
}

configureTranslation();

const root = createRoot(rootElement);
root.render(<Root />);

function Root() {
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

  return (
    <ChakraProvider resetCSS>
      <DIOneTimeProvider parentContainer={container}>
        <SomePage />
      </DIOneTimeProvider>
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
