import { Request, Response } from 'express';
import { api, delete_, get, post, put } from 'mvc-middleware';
import { Logger } from '@food-captain/server-utils';
import { MenuService } from '../services/MenuService';
import BaseApiController from './BaseApiController';
import { RecipeDto } from './RecipeApiController';

@api
export default class MenuApiController extends BaseApiController {
  constructor(
    private readonly menuService: MenuService,
    logger: Logger,
    request: Request,
    response: Response
  ) {
    super(logger, request, response);
  }

  @get('menus')
  async getMenusAsync() {
    const result = await this.menuService.getAllAsync();
    return this.ok(result);
  }

  @get('menu/:menuId')
  async getMenuByIdAsync(menuId: string) {
    const result = await this.menuService.getMenuByIdAsync(
      parseInt(menuId, 10)
    );
    return this.ok(result);
  }

  @post('menu')
  async addMenuAsync(dto: MenuDto) {
    const createdMenu = await this.menuService.addAsync({
      ...dto,
      recipes: dto.recipes?.map((recipeDto) => ({
        recipe_id: recipeDto.id,
        order_number: recipeDto.order,
      })),
    });
    return this.ok(createdMenu);
  }

  // @put('menu/:menuId')
  // async updateMenuAsync(menuId: string, dto: MenuDto) {
  //   const updatedMenu = await this.menuService.updateAsync({
  //     ...dto,
  //     recipes: dto.recipes?.map((dishDto) => ({
  //       dish_id: dishDto.id,
  //       order_number: dishDto.order,
  //     })),
  //   });
  //   return this.ok(updatedMenu);
  // }

  @delete_('menu/:menuId')
  async deleteMenuAsync(menuId: string) {
    const menu = await this.menuService.getMenuByIdAsync(parseInt(menuId, 10));
    if (!menu) {
      return this.notFound('menu not found');
    }

    const removed = await this.menuService.deleteAsync(menu);
    return this.ok({ removed });
  }
}

export interface MenuDto {
  id: number;
  name?: string;
  author_id: number;
  recipes?: DishInMenuDto[];
}
export interface DishInMenuDto extends RecipeDto {
  order?: number;
}
