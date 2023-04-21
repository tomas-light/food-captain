import { createReducer } from 'redux-controller-middleware';
import { RecipeForViewDto } from '@food-captain/api';
import { Dish } from '~/models';

export class DishStore {
  dishesAreLoading: boolean;
  dishes: Dish[];

  dishRecipesAreLoading: boolean;
  dishRecipes: Map<
    Dish['id'] | null | undefined,
    Map<RecipeForViewDto['id'], RecipeForViewDto>
  >;

  constructor(store?: DishStore) {
    this.dishesAreLoading = false;
    this.dishes = store?.dishes ?? [];

    this.dishRecipesAreLoading = false;
    this.dishRecipes = store?.dishRecipes ?? new Map();
  }

  static update = 'DISH_update_store';
  static reducer = createReducer(new DishStore(), DishStore.update);
}
