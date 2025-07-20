import type { RoleTableEntity } from './RoleTable.entity';
import type { UserTableEntity } from './UserTable.entity';

export interface UserRoleTableEntity {
  user_id: UserTableEntity['id'];
  role_id: RoleTableEntity['id'];
}
