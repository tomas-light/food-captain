import { storeSlice } from 'redux-controller-middleware';
import { Dimension, Ingredient } from '../../../models/index';

@storeSlice
export class IngredientStoreSlice {
  ingredientsAreLoading: boolean;
  ingredientsMap: Map<Ingredient['id'] | null | undefined, Ingredient>;

  dimensionsAreLoading: boolean;
  dimensionsMap: Map<Dimension['id'] | null | undefined, Dimension>;

  constructor(store?: IngredientStoreSlice) {
    this.ingredientsAreLoading = false;
    this.ingredientsMap = store?.ingredientsMap ?? new Map();

    this.dimensionsAreLoading = false;
    this.dimensionsMap = store?.dimensionsMap ?? new Map();
  }
}