import type { UserTableEntity } from './UserTable.entity';

export interface ActiveAuthTable {
  key: 'authorizedUserId';
  value: UserTableEntity['id'];
}
