import { autoMap, Mapper, MapFunction } from '@tomas-light/mapper-js';
import { MenuEntity } from '@food-captain/database';

export abstract class Menu extends MenuEntity {
  abstract recipes?: {
    recipe_id: number;
    order_number?: number;
  }[];
}

Mapper.addMapFunctions(
  new MapFunction(Menu, MenuEntity, (menu) => {
    return autoMap(
      menu,
      {},
      {
        ignore: ['recipes'],
      }
    );
  }),
  new MapFunction(MenuEntity, Menu, (menu) => {
    return autoMap(menu, {}, {});
  })
);
