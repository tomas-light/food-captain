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

  let id = 0;
  const roles: RoleTableEntity[] = [
    create('admin'),
    create('user'),
    create('guest'),
  ];

  function create(name: RoleTableEntity['name']): RoleTableEntity {
    return {
      id: ++id,
      name,
    };
  }

  return {
    roles,
    saveRoles: () => {
      roles.forEach((role) => {
        void database.role.insert(role.id, role);
      });
    },
  };
}
