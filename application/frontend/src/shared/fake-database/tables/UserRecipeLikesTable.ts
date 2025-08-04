import type { UserRecipeLikesTableEntity } from './UserRecipeLikesTable.entity';

export interface UserRecipeLikesTable {
  key: UserRecipeLikesTableEntity['id'];
  value: UserRecipeLikesTableEntity;
}
