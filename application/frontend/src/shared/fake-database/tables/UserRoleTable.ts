import type { Database } from '../../database';
import { fakeUserCredentials } from '../fakeUserCredentials';
import type { UserRoleTableEntity } from './UserRoleTable.entity';

type UserRoleTableCompositeId =
  `${UserRoleTableEntity['user_id']}:${UserRoleTableEntity['role_id']}`;

export interface UserRoleTable {
  key: UserRoleTableCompositeId;
  value: UserRoleTableEntity;
}

export function initUserRoleTable(options: {
  database: Database<{
    userRole: UserRoleTable;
  }>;
}) {
  const { database } = options;

  const userRoles: UserRoleTableEntity[] = [
    {
      role_id: 1, // admin role id
      user_id: fakeUserCredentials.artem.id,
    },
  ];

  return {
    saveUserRoles: () => {
      userRoles.forEach((userRole) => {
        const key: UserRoleTableCompositeId = `${userRole.user_id}:${userRole.role_id}`;
        void database.userRole.insert(key, userRole);
      });
    },
  };
}
