import { Request, Response } from 'express';
import { api, get, post, put, delete_ } from 'mvc-middleware';
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

  @get('dish')
  async getDishesAsync() {
    const dishes = await this.dishService.getAllAsync();
    return this.ok(dishes);
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
    const dish = await this.dishService.getDishByIdAsync(dishId);
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
