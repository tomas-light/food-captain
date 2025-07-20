import type { Database } from '../../database';
import type { DishInMenuTableEntity } from './DishInMenuTable.entity';

type DishInMenuTableCompositeId =
  `${DishInMenuTableEntity['menu_id']}:${DishInMenuTableEntity['recipe_id']}`;

export interface DishInMenuTable {
  key: DishInMenuTableCompositeId;
  value: DishInMenuTableEntity;
}

export function initDishInMenuTable(options: {
  database: Database<{
    dishInMenu: DishInMenuTable;
  }>;
}) {
  const { database } = options;

  const dishesInMenus: DishInMenuTableEntity[] = [];

  return {
    saveDishesInMenu: () => {
      dishesInMenus.forEach((dishInMenu) => {
        const key: DishInMenuTableCompositeId = `${dishInMenu.menu_id}:${dishInMenu.recipe_id}`;
        void database.dishInMenu.insert(key, dishInMenu);
      });
    },
  };
}
