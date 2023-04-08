import { UserWithRoleDto } from '@food-captain/api';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ApiInterceptor,
  LoggedApiError,
  LoggedApiRequest,
  LoggedApiResponse,
  UserApi,
} from '@food-captain/client-api';
import { Button } from '@food-captain/client-shared';
import { container } from 'cheap-di';
import { DIOneTimeProvider, use } from 'cheap-di-react';
import { ChakraProvider } from '@chakra-ui/react';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Cant find element with id "root"');
}

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
        load users
      </Button>

      {users &&
        Array.isArray(users) &&
        users.map((user) => (
          <p key={JSON.stringify(user)}>{JSON.stringify(user, null, 2)}</p>
        ))}
    </div>
  );
}
