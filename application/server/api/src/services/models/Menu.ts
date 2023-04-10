import { autoMap, Mapper, MapFunction } from '@tomas-light/mapper-js';
import { MenuEntity } from '@food-captain/database';

export abstract class Menu extends MenuEntity {
  abstract dishes?: {
    dish_id: number;
    order_number?: number;
  }[];
}

Mapper.addMapFunctions(
  new MapFunction(Menu, MenuEntity, (menu) => {
    return autoMap(
      menu,
      {},
      {
        ignore: ['dishes'],
      }
    );
  }),
  new MapFunction(MenuEntity, Menu, (menu) => {
    return autoMap(menu, {}, {});
  })
);
