import { use } from 'cheap-di-react';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserWithRoleDto } from '@food-captain/api';
import { UserApi } from '@food-captain/client-api';
import { Button } from '@food-captain/client-shared';
import { useLocaleResource } from '~/config/i18next';

const SomePage: FC = () => {
  const userApi = use(UserApi);
  const { t } = useTranslation();
  useLocaleResource('buttons');
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
};

export { SomePage };
