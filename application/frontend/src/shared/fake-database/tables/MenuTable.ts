import { faker } from '@faker-js/faker/locale/ru';
import type { Database } from '../../database';
import type { MenuTableEntity } from './MenuTable.entity';
import type { UserTableEntity } from './UserTable.entity';

export interface MenuTable {
  key: MenuTableEntity['id'];
  value: MenuTableEntity;
}

export function initMenuTable(options: {
  database: Database<{
    menu: MenuTable;
  }>;
  users: UserTableEntity[];
}) {
  const { database, users } = options;

  let id = 0;
  const menus: MenuTableEntity[] = [
    {
      id: ++id,
      name: faker.food.dish(),
      author_id: faker.helpers.arrayElement(users).id,
      create_date: faker.date.past().toISOString(),
      last_update: undefined,
      order_number: undefined,
    },
    {
      id: ++id,
      name: faker.food.dish(),
      author_id: faker.helpers.arrayElement(users).id,
      create_date: faker.date.past().toISOString(),
      last_update: undefined,
      order_number: undefined,
    },
    {
      id: ++id,
      name: faker.food.dish(),
      author_id: faker.helpers.arrayElement(users).id,
      create_date: faker.date.past().toISOString(),
      last_update: undefined,
      order_number: undefined,
    },
    {
      id: ++id,
      name: faker.food.dish(),
      author_id: faker.helpers.arrayElement(users).id,
      create_date: faker.date.past().toISOString(),
      last_update: undefined,
      order_number: undefined,
    },
    {
      id: ++id,
      name: faker.food.dish(),
      author_id: faker.helpers.arrayElement(users).id,
      create_date: faker.date.past().toISOString(),
      last_update: undefined,
      order_number: undefined,
    },
  ];

  return {
    menus,
    saveMenus: () => {
      menus.forEach((menu) => {
        void database.menu.insert(menu.id, menu);
      });
    },
  };
}
