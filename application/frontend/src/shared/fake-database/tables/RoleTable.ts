import type { Database } from '../../database';
import type { RoleTableEntity } from './RoleTable.entity';

export interface RoleTable {
  key: RoleTableEntity['id'];
  value: RoleTableEntity;
}

export function initRoleTable(options: {
  database: Database<{
    role: RoleTable;
  }>;
}) {
  const { database } = options;

  const roles: RoleTableEntity[] = [
    create(1, 'admin'),
    create(2, 'user'),
    create(3, 'guest'),
  ];

  function create(
    id: RoleTableEntity['id'],
    name: RoleTableEntity['name']
  ): RoleTableEntity {
    return {
      id,
      name,
    };
  }

  return {
    saveRoles: () => {
      roles.forEach((role) => {
        void database.role.insert(role.id, role);
      });
    },
  };
}
