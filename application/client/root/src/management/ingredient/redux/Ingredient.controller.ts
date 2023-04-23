import {
  ControllerBase,
  createAction,
  Middleware,
  watch,
  WatchedController,
} from 'redux-controller-middleware';
import type { Action } from 'redux-controller-middleware';
import { DimensionApi, IngredientApi } from '@food-captain/client-api';
import { Dimension, Ingredient, NewIngredient } from '~/models';
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
        ingredientsMap: new Map(),
        ingredientsAreLoading: false,
      });

      return;
    }

    const ingredientsMap = new Map<
      Ingredient['id'] | null | undefined,
      Ingredient
    >();
    response.data.forEach((dto) => {
      ingredientsMap.set(dto.id, dto);
    });

    this.updateStore({
      ingredientsMap: ingredientsMap,
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
        dimensionsMap: new Map(),
        dimensionsAreLoading: false,
      });

      return;
    }

    const dimensionsMap = new Map<
      Dimension['id'] | null | undefined,
      Dimension
    >();
    response.data.forEach((dto) => {
      dimensionsMap.set(dto.id, dto);
    });

    this.updateStore({
      dimensionsMap: dimensionsMap,
      dimensionsAreLoading: false,
    });
  }

  @watch
  async addIngredient(
    action: Action<{
      ingredient: NewIngredient;
      callback?: (ingredient: Ingredient) => void;
    }>
  ) {
    const { ingredient, callback } = action.payload;

    const response = await this.ingredientApi.addAsync(ingredient);
    if (response.isFailed() || !response.data) {
      // todo: show toast fail
      return;
    }

    const { ingredientsMap } = this.getState().ingredient;
    const newMap = new Map(ingredientsMap);
    newMap.set(response.data.id, response.data);

    this.updateStore({
      ingredientsMap: newMap,
    });
    // todo: show toast success

    callback?.(response.data);
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

    const { ingredientsMap } = this.getState().ingredient;
    const newMap = new Map(ingredientsMap);
    newMap.set(response.data.id, response.data);

    this.updateStore({
      ingredientsMap: newMap,
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

    const { ingredientsMap } = this.getState().ingredient;
    const newMap = new Map(ingredientsMap);
    newMap.delete(ingredientId);

    this.updateStore({
      ingredientsMap: newMap,
    });
    // todo: show toast success

    callback?.();
  }
}

const ingredientController: WatchedController<IngredientController> =
  IngredientController as any;
export { ingredientController as IngredientController };
