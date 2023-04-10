import { Request, Response } from 'express';
import { api, get, post, put, delete_ } from 'mvc-middleware';
import { DishEntity } from '@food-captain/database';
import { Logger } from '@food-captain/server-utils';
import { DishService } from '../services/DishService';
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

  @get('dish')
  async getDishesAsync() {
    const result = await this.dishService.getAllAsync();
    return this.ok(result);
  }

  @post('dish')
  async addDishAsync(dish: NewDishDto) {
    const result = await this.dishService.addAsync(dish);
    return this.ok(result);
  }

  @put('dish/:dishId')
  async updateDishAsync(dishId: number, dish: UpdatedDishDto) {
    const result = await this.dishService.updateAsync(dish);
    return this.ok(result);
  }

  @delete_('dish/:dishId')
  async deleteDishAsync(dishId: number) {
    const dish = await this.dishService.getDishByIdAsync(dishId);
    if (!dish) {
      return this.notFound('dish not found');
    }

    const result = await this.dishService.deleteAsync(dish);
    if (result) {
      return this.noContent();
    }
    return this.badRequest('Deletion is failed');
  }
}

export interface DishDto extends DishEntity {}
export interface NewDishDto extends Omit<DishEntity, 'id'> {
  image?: string;
}
export interface UpdatedDishDto extends DishEntity {
  image?: string;
}
