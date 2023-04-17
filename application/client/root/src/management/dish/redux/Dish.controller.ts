import type { Action } from 'redux-controller-middleware';
import {
  ControllerBase,
  createAction,
  Middleware,
  watch,
  WatchedController,
} from 'redux-controller-middleware';
import { DishDto, RecipeWithIngredientsDto } from '@food-captain/api';
import { DishApi, RecipeApi } from '@food-captain/client-api';
import { Dish, NewDish, NewRecipe, UpdatedDish } from '~/models';
import { DishStore } from './Dish.store';
import { State } from '~State';

@watch
class DishController extends ControllerBase<State> {
  constructor(
    middleware: Middleware<State>,
    private readonly dishApi: DishApi,
    private readonly recipeApi: RecipeApi
  ) {
    super(middleware);
  }

  private updateStore(partialStore: Partial<DishStore>) {
    this.dispatch(createAction(DishStore.update, partialStore));
  }

  @watch
  async loadDishes() {
    this.updateStore({ dishesAreLoading: true });

    const response = await this.dishApi.getAllAsync();
    if (response.isFailed() || !response.data) {
      this.updateStore({
        dishesAreLoading: false,
        dishes: [],
      });

      return;
    }

    this.updateStore({
      dishesAreLoading: false,
      dishes: response.data,
    });
  }

  @watch
  async loadDishWithRecipe(action: Action<{ dishId: DishDto['id'] }>) {
    const { dishId } = action.payload;

    this.updateStore({ dishesAreLoading: true, dishRecipesAreLoading: true });

    const dishResponse = await this.dishApi.getByIdAsync(dishId);
    if (dishResponse.isFailed() || !dishResponse.data) {
      this.updateStore({
        dishesAreLoading: false,
        dishRecipesAreLoading: false,
      });

      return;
    }

    const recipeResponse = await this.recipeApi.getByDishIdAsync(dishId);
    if (recipeResponse.isFailed() || !recipeResponse.data) {
      this.updateStore({
        dishesAreLoading: false,
        dishRecipesAreLoading: false,
      });

      return;
    }

    const { dishes, dishRecipes } = this.getState().dish;
    const newDishRecipeMap = new Map(dishRecipes);

    let recipeMap: Map<number, RecipeWithIngredientsDto>;
    const recipes = newDishRecipeMap.get(dishId);
    if (!recipes) {
      recipeMap = new Map<
        RecipeWithIngredientsDto['id'],
        RecipeWithIngredientsDto
      >();
    } else {
      recipeMap = new Map(recipes);
    }

    recipeResponse.data.forEach((recipe) => {
      recipeMap.set(recipe.id, recipe);
    });

    newDishRecipeMap.set(dishId, recipeMap);

    this.updateStore({
      dishesAreLoading: false,
      dishRecipesAreLoading: false,
      dishes: dishes
        .filter((dish) => dish.id !== dishId)
        .concat(dishResponse.data),
      dishRecipes: newDishRecipeMap,
    });
  }

  @watch
  async addDish(
    action: Action<{ dish: NewDish; recipe: NewRecipe; callback?: () => void }>
  ) {
    const { dish, recipe, callback } = action.payload;

    const dishResponse = await this.dishApi.addAsync(dish);
    if (dishResponse.isFailed() || !dishResponse.data) {
      return;
    }

    recipe.dish_id = dishResponse.data.id;

    const recipeResponse = await this.recipeApi.addAsync(recipe);
    if (recipeResponse.isFailed() || !recipeResponse.data) {
      return;
    }

    const { dishes } = this.getState().dish;

    this.updateStore({
      dishes: dishes.concat(dishResponse.data),
    });

    callback?.();
  }

  @watch
  async updateDish(
    action: Action<{ dish: UpdatedDish; callback?: () => void }>
  ) {
    const { dish, callback } = action.payload;

    const response = await this.dishApi.updateAsync(dish);
    if (response.isFailed() || !response.data) {
      return;
    }

    const { dishes } = this.getState().dish;

    this.updateStore({
      dishes: dishes
        .filter((_dish) => _dish.id !== dish.id)
        .concat(response.data),
    });

    callback?.();
  }

  @watch
  async removeDish(
    action: Action<{ dishId: Dish['id']; callback?: () => void }>
  ) {
    const { dishId, callback } = action.payload;

    const response = await this.dishApi.deleteAsync(dishId);
    if (response.isFailed() || !response.data) {
      return;
    }

    const { dishes } = this.getState().dish;

    this.updateStore({
      dishes: dishes.filter((dish) => dish.id !== dishId),
    });

    callback?.();
  }
}

const dishController: WatchedController<DishController> = DishController as any;
export { dishController as DishController };
