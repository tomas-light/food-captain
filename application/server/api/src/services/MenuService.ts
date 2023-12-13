import { Mapper } from '@tomas-light/mapper-js';
import { Database, MenuEntity, UserEntity } from '@food-captain/database';
import { Logger } from '@food-captain/server-utils';
import { MakeOptional } from '../utils/MakeOptional';
import { Menu } from './models/Menu';
import { RecipeService } from './RecipeService';
import { UserService } from './UserService';

export class MenuService {
  constructor(
    private readonly db: Database,
    private readonly recipeService: RecipeService,
    private readonly userService: UserService,
    private readonly logger: Logger
  ) {}

  async getAllAsync(): Promise<Menu[]> {
    const entities = await this.db.menu.allAsync();
    if (!entities.length) {
      return [];
    }

    const menus = entities.map((entity) => ({ ...entity })) as Menu[];

    const userMenuMap = new Map<UserEntity['id'], typeof menus>();

    menus.forEach((menu) => {
      if (menu.author_id == null) {
        return;
      }

      const menuIds = userMenuMap.get(menu.author_id);
      if (menuIds) {
        menuIds.push(menu);
      } else {
        userMenuMap.set(menu.author_id, [menu]);
      }
    });

    // const menuIds = menus.map((menu) => menu.id);
    // const recipes = await this.db.recipe.byMenuIdsAsync(menuIds);
    //
    // const menuDishMap = new Map<Menu['id'], Menu['recipes']>();
    // recipes.forEach((menuDish) => {
    //   // if (menuDish.menu_id == null) {
    //   //   return;
    //   // }
    //
    //   const menuDishesPomace = menuDishMap.get(menuDish.menu_id);
    //   const dish = {
    //     dish_id: menuDish.id,
    //     order_number: menuDish.order_number,
    //   };
    //
    //   if (menuDishesPomace) {
    //     menuDishesPomace.push(dish);
    //   } else {
    //     menuDishMap.set(menuDish.menu_id, [dish]);
    //   }
    // });
    //
    // menus.forEach((menu) => {
    //   menu.recipes = menuDishMap.get(menu.id);
    // });

    return menus;
  }

  async getMenuByIdAsync(menuId: number): Promise<Menu | undefined> {
    const menuWithDishesEntities =
      await this.db.menu.getWithDishesByIdAsync(menuId);
    if (!menuWithDishesEntities.length) {
      return undefined;
    }

    const [menuEntity] = menuWithDishesEntities;

    const menu = Mapper.map(MenuEntity, Menu, menuEntity);

    for await (const entity of menuWithDishesEntities) {
      menu.recipes?.push({
        recipe_id: entity.recipe_id,
        order_number: entity.order_number,
      });
    }

    return menu;
  }

  async addAsync(
    menu: MakeOptional<Omit<Menu, 'create_date' | 'last_update'>, 'id'>
  ): Promise<Menu | undefined> {
    const now = this.getDateNow().toISOString();

    menu.id = await this.db.menu.insertAsync({
      name: menu.name,
      create_date: now,
      last_update: now,
      author_id: menu.author_id,
    });

    if (menu.id == null) {
      this.logger.warning(`Menu is not inserted in DB (menu id is ${menu.id})`);
      return undefined;
    }

    if (menu.recipes == null) {
      return menu as Menu;
    }

    for await (const dish of menu.recipes) {
      await this.db.dishInMenu.insertAsync({
        ...dish,
        menu_id: menu.id,
      });
    }

    return menu as Menu;
  }

  private getDateNow() {
    return new Date(Date.now()); // todo: do we need UTC conversation here?
  }

  // async updateAsync(
  //   menu: MakeOptional<Menu, 'create_date' | 'last_update'>
  // ): Promise<Menu | undefined> {
  //   menu.last_update = this.getDateNow().toISOString();
  //
  //   const entity = Mapper.map(Menu, MenuEntity, menu);
  //
  //   const menuEntity = await this.db.menu.updateAsync(entity);
  //   if (!menuEntity) {
  //     return undefined;
  //   }
  //
  //   const dishMap = new Map(
  //     menu.recipes?.map((dish) => [dish.recipe_id, dish]) ?? []
  //   );
  //
  //   const dishesIdForDelete: number[] = [];
  //   const recipes = await this.db.recipe.byMenuIdAsync(menuEntity.id);
  //
  //   const dishIdsBeforeUpdate = new Set(recipes.map((dish) => dish.id));
  //
  //   dishIdsBeforeUpdate.forEach((dishId) => {
  //     if (!dishMap.has(dishId)) {
  //       dishesIdForDelete.push(dishId);
  //     }
  //   });
  //
  //   const dishesForAdding: Omit<DishInMenuEntity, 'menu_id'>[] = [];
  //
  //   dishMap.forEach((menuDish, dishId) => {
  //     if (!dishIdsBeforeUpdate.has(dishId)) {
  //       dishesForAdding.push({
  //         recipe_id: dishId,
  //         order_number: menuDish.order_number,
  //       });
  //     }
  //   });
  //
  //   // todo: no need to wait promise resolving
  //   if (dishesIdForDelete.length) {
  //     await this.db.dishInMenu.deleteByIdsAsync(dishesIdForDelete);
  //   }
  //
  //   // todo: use bulk insert
  //   for await (const dish of dishesForAdding) {
  //     await this.db.dishInMenu.insertAsync({
  //       ...dish,
  //       menu_id: menuEntity.id,
  //     });
  //   }
  // }

  async deleteAsync(menu: Menu): Promise<boolean> {
    const menuWasDeletedFromSchedules =
      await this.db.menuInSchedule.deleteAllByMenuIdAsync(menu.id);
    if (!menuWasDeletedFromSchedules) {
      return false;
    }

    const dishesWereDeletedFromMenu =
      await this.db.dishInMenu.deleteAllByMenuIdAsync(menu.id);
    if (!dishesWereDeletedFromMenu) {
      return false;
    }

    return await this.db.menu.deleteByIdAsync(menu.id);
  }
}
