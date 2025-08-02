import type { UserTableEntity } from './tables/UserTable.entity';

export const fakeUserCredentials = {
  artem: {
    id: 1,
    email: 'artem@food-captain.com',
    name: 'Артём Игнатьев',
    password: 'the-password',
  },
} satisfies Record<string, UserTableEntity>;
