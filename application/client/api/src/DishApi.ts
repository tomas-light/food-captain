import { DishDto, NewDishDto } from '@food-captain/api';
import { ApiBase } from './base/ApiBase';

export class DishApi extends ApiBase {
  async getAllAsync() {
    return this.get<DishDto[]>('/dishes');
  }

  async getManyAsync(dishIds: DishDto['id'][]) {
    return this.post<DishDto[]>('/dishes-by-ids', dishIds);
  }

  async getByIdAsync(dishId: DishDto['id']) {
    return this.get<DishDto>(`dish/${dishId}`);
  }

  async addAsync(dish: NewDishDto) {
    return this.post<DishDto>('dish', dish);
  }

  async updateAsync(dish: DishDto) {
    return this.put<DishDto>(`dish/${dish.id}`, dish);
  }

  async deleteAsync(dishId: DishDto['id']) {
    return this.delete<{ removed: boolean }>(`dish/${dishId}`);
  }
}
