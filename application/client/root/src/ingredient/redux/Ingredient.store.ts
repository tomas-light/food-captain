import { createReducer } from 'redux-controller-middleware';
import { Dimension, Ingredient } from '~/models';

export class IngredientStore {
  ingredientsAreLoading: boolean;
  ingredients: Ingredient[];

  dimensionsAreLoading: boolean;
  dimensions: Dimension[];

  constructor(store?: IngredientStore) {
    this.ingredientsAreLoading = false;
    this.ingredients = store?.ingredients ?? [];

    this.dimensionsAreLoading = false;
    this.dimensions = store?.dimensions ?? [];
  }

  static update = 'INGREDIENT_update_store';
  static reducer = createReducer(new IngredientStore(), IngredientStore.update);
}
