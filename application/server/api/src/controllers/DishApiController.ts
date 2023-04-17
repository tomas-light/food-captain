import { Request, Response } from 'express';
import { api, delete_, get, post, put } from 'mvc-middleware';
import { DishEntity } from '@food-captain/database';
import { Logger } from '@food-captain/server-utils';
import { DishService } from '../services/DishService';
import { NewImage } from '../services/ImageService';
import BaseApiController from './BaseApiController';

@api
export default class DishApiController extends BaseApiController {
  constructor(
    private readonly dishService: DishService,
    logger: Logger,
    request: Request,
    response: Response
  ) {
    super(logger, request, response);
  }

  @get('dishes')
  async getDishesAsync() {
    const dishes = await this.dishService.getAllAsync();
    return this.ok(dishes);
  }

  @post('dishes-by-ids')
  async getManyAsync(dishIds: DishEntity['id'][]) {
    const ingredients = await this.dishService.getManyAsync(dishIds);
    return this.ok(ingredients);
  }

  @get('dish/:dishId')
  async getByIdAsync(dishId: string) {
    const id = parseInt(dishId, 10);

    if (isNaN(id)) {
      return this.badRequest('Dish id is invalid');
    }

    const dish = await this.dishService.getByIdAsync(id);
    if (!dish) {
      return this.notFound('Dish not found');
    }

    return this.ok(dish);
  }

  @post('dish')
  async addDishAsync(dish: NewDishDto) {
    const createdDish = await this.dishService.addAsync(dish);
    return this.ok(createdDish);
  }

  @put('dish/:dishId')
  async updateDishAsync(dishId: number, dish: UpdatedDishDto) {
    const updatedDish = await this.dishService.updateAsync(dish);
    return this.ok(updatedDish);
  }

  @delete_('dish/:dishId')
  async deleteDishAsync(dishId: number) {
    const dish = await this.dishService.getByIdAsync(dishId);
    if (!dish) {
      return this.notFound('dish not found');
    }

    const removed = await this.dishService.deleteAsync(dish);
    return this.ok({ removed });
  }
}

export interface DishDto extends DishEntity {}
export interface NewDishDto extends Omit<DishEntity, 'id'> {
  image?: NewImage;
}
export interface UpdatedDishDto extends DishEntity {
  image?: NewImage;
}
