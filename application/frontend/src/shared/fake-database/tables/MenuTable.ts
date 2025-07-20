import type { Database } from '../../database';
import { fakeUserCredentials } from '../fakeUserCredentials';
import type { IngredientTableEntity } from './IngredientTable.entity';
import type { MenuTableEntity } from './MenuTable.entity';

export interface MenuTable {
  key: MenuTableEntity['id'];
  value: MenuTableEntity;
}

export function initMenuTable(options: {
  database: Database<{
    menu: MenuTable;
  }>;
}) {
  const { database } = options;

  const menus: MenuTableEntity[] = [
    create(
      1,
      '2021-02-24',
      '2021-02-24',
      fakeUserCredentials.artem.id,
      'menu 1'
    ),
    create(
      2,
      '2021-02-24',
      '2021-02-24',
      fakeUserCredentials.artem.id,
      'menu 2'
    ),
  ];

  function create(
    id: MenuTableEntity['id'],
    create_date: MenuTableEntity['create_date'],
    last_update: MenuTableEntity['last_update'],
    author_id: MenuTableEntity['author_id'],
    name: MenuTableEntity['name']
  ): MenuTableEntity {
    return {
      id,
      create_date,
      last_update,
      author_id,
      name,
    };
  }

  return {
    saveMenus: () => {
      menus.forEach((menu) => {
        void database.menu.insert(menu.id, menu);
      });
    },
  };
}
