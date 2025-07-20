import type { Database } from '../../database';
import { fakeUserCredentials } from '../fakeUserCredentials';
import type { UserTableEntity } from './UserTable.entity';

export interface UserTable {
  key: UserTableEntity['email'];
  value: UserTableEntity;
}

export function initUserTable(options: {
  database: Database<{
    user: UserTable;
  }>;
}) {
  const { database } = options;

  const users: UserTableEntity[] = [fakeUserCredentials.artem];

  return {
    users,
    saveUsers: () => {
      users.forEach((entity) => {
        void database.user.insert(entity.email, entity);
      });
    },
  };
}
