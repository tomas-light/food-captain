import {
  ControllerBase,
  createAction,
  Middleware,
  watch,
  WatchedController,
} from 'redux-controller-middleware';
import type { Action } from 'redux-controller-middleware';
import { DimensionApi, IngredientApi } from '@food-captain/client-api';
import { Ingredient, NewIngredient } from '~/models';
import { IngredientStore } from './Ingredient.store';
import { State } from '~State';

@watch
class IngredientController extends ControllerBase<State> {
  constructor(
    middleware: Middleware<State>,
    private readonly ingredientApi: IngredientApi,
    private readonly dimensionApi: DimensionApi
  ) {
    super(middleware);
  }

  private updateStore(partialStore: Partial<IngredientStore>) {
    this.dispatch(createAction(IngredientStore.update, partialStore));
  }

  @watch
  async loadIngredients() {
    this.updateStore({ ingredientsAreLoading: true });

    const response = await this.ingredientApi.getAllAsync();
    if (response.isFailed() || !response.data) {
      // todo: show toast fail
      this.updateStore({
        ingredients: [],
        ingredientsAreLoading: false,
      });

      return;
    }

    this.updateStore({
      ingredients: response.data,
      ingredientsAreLoading: false,
    });
  }

  @watch
  async loadDimensions() {
    this.updateStore({ dimensionsAreLoading: true });

    const response = await this.dimensionApi.getAllAsync();
    if (response.isFailed() || !response.data) {
      // todo: show toast fail
      this.updateStore({
        dimensions: [],
        dimensionsAreLoading: false,
      });

      return;
    }

    this.updateStore({
      dimensions: response.data,
      dimensionsAreLoading: false,
    });
  }

  @watch
  async addIngredient(
    action: Action<{ ingredient: NewIngredient; callback?: () => void }>
  ) {
    const { ingredient, callback } = action.payload;

    const response = await this.ingredientApi.addAsync(ingredient);
    if (response.isFailed() || !response.data) {
      // todo: show toast fail
      return;
    }

    const { ingredients } = this.getState().ingredient;

    this.updateStore({
      ingredients: ingredients.concat(response.data),
    });
    // todo: show toast success

    callback?.();
  }

  @watch
  async updateIngredient(
    action: Action<{ ingredient: Ingredient; callback?: () => void }>
  ) {
    const { ingredient, callback } = action.payload;

    const response = await this.ingredientApi.updateAsync(ingredient);
    if (response.isFailed() || !response.data) {
      // todo: show toast fail
      return;
    }

    const { ingredients } = this.getState().ingredient;

    this.updateStore({
      ingredients: ingredients
        .filter((_ingredient) => _ingredient.id !== ingredient.id)
        .concat(response.data),
    });
    // todo: show toast success

    callback?.();
  }

  @watch
  async removeIngredient(
    action: Action<{ ingredientId: Ingredient['id']; callback?: () => void }>
  ) {
    const { ingredientId, callback } = action.payload;

    const response = await this.ingredientApi.deleteAsync(ingredientId);
    if (response.isFailed() || !response.data) {
      // todo: show toast fail
      return;
    }

    if (!response.data.removed) {
      // todo: show toast fail
      return;
    }

    const { ingredients } = this.getState().ingredient;

    this.updateStore({
      ingredients: ingredients.filter((dish) => dish.id !== ingredientId),
    });
    // todo: show toast success

    callback?.();
  }
}

const ingredientController: WatchedController<IngredientController> =
  IngredientController as any;
export { ingredientController as IngredientController };
