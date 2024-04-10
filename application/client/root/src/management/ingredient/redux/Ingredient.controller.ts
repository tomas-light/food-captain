import type { Action } from 'redux-controller-middleware';
import {
  controller,
  ControllerBase,
  Middleware,
  reducer,
  WatchedController,
} from 'redux-controller-middleware';
import { toast } from 'react-toastify';
import { DimensionApi, IngredientApi } from '@food-captain/client-api';
import { State } from '../../../config/redux/index';
import { Dimension, Ingredient, NewIngredient } from '../../../models/index';
import { IngredientStoreSlice } from './Ingredient.storeSlice';

@controller
class IngredientController extends ControllerBase<IngredientStoreSlice, State> {
  constructor(
    middleware: Middleware<State>,
    private readonly ingredientApi: IngredientApi,
    private readonly dimensionApi: DimensionApi
  ) {
    super(middleware, IngredientStoreSlice);
  }

  @reducer
  async loadIngredients() {
    this.updateStoreSlice({ ingredientsAreLoading: true });

    const response = await this.ingredientApi.getAllAsync();
    if (response.isFailed() || !response.data) {
      this.updateStoreSlice({
        ingredientsMap: new Map(),
        ingredientsAreLoading: false,
      });
      // todo: add localization
      toast('Не удалось загрузить ингредиенты', {
        type: 'error',
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

    this.updateStoreSlice({
      ingredientsMap: ingredientsMap,
      ingredientsAreLoading: false,
    });
  }

  @reducer
  async loadDimensions() {
    this.updateStoreSlice({ dimensionsAreLoading: true });

    const response = await this.dimensionApi.getAllAsync();
    if (response.isFailed() || !response.data) {
      this.updateStoreSlice({
        dimensionsMap: new Map(),
        dimensionsAreLoading: false,
      });
      // todo: add localization
      toast('Не удалось загрузить размерности', {
        type: 'error',
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

    this.updateStoreSlice({
      dimensionsMap: dimensionsMap,
      dimensionsAreLoading: false,
    });
  }

  @reducer
  async addIngredient(
    action: Action<{
      ingredient: NewIngredient;
      callback?: (ingredient: Ingredient) => void;
    }>
  ) {
    const { ingredient, callback } = action.payload;

    const response = await this.ingredientApi.addAsync(ingredient);
    if (response.isFailed() || !response.data) {
      // todo: add localization
      toast('Не удалось добавить ингредиент', {
        type: 'error',
      });
      return;
    }

    const { ingredientsMap } = this.getState().ingredient;
    const newMap = new Map(ingredientsMap);
    newMap.set(response.data.id, response.data);

    this.updateStoreSlice({
      ingredientsMap: newMap,
    });
    // todo: add localization
    toast(`Ингредиент "${ingredient.name}" добавлен`, {
      type: 'success',
    });

    callback?.(response.data);
  }

  @reducer
  async updateIngredient(
    action: Action<{ ingredient: Ingredient; callback?: () => void }>
  ) {
    const { ingredient, callback } = action.payload;

    const response = await this.ingredientApi.updateAsync(ingredient);
    if (response.isFailed() || !response.data) {
      // todo: add localization
      toast('Не удалось обновить ингредиент', {
        type: 'error',
      });
      return;
    }

    const { ingredientsMap } = this.getState().ingredient;
    const newMap = new Map(ingredientsMap);
    newMap.set(response.data.id, response.data);

    this.updateStoreSlice({
      ingredientsMap: newMap,
    });
    // todo: add localization
    toast(`Ингредиент "${ingredient.name}" обновлен`, {
      type: 'success',
    });

    callback?.();
  }

  @reducer
  async removeIngredient(
    action: Action<{ ingredientId: Ingredient['id']; callback?: () => void }>
  ) {
    const { ingredientId, callback } = action.payload;

    const response = await this.ingredientApi.deleteAsync(ingredientId);
    if (response.isFailed() || !response.data) {
      // todo: add localization
      toast('Не удалось удалить ингредиент', {
        type: 'error',
      });
      return;
    }

    if (!response.data.removed) {
      // todo: add localization
      toast('Не удалось удалить ингредиент', {
        type: 'error',
      });
      return;
    }

    const { ingredientsMap } = this.getState().ingredient;
    const newMap = new Map(ingredientsMap);
    newMap.delete(ingredientId);

    this.updateStoreSlice({
      ingredientsMap: newMap,
    });
    // todo: add localization
    toast('Ингредиент удалён', {
      type: 'success',
    });

    callback?.();
  }
}

const ingredientController: WatchedController<IngredientController> =
  IngredientController as any;
export { ingredientController as IngredientController };
