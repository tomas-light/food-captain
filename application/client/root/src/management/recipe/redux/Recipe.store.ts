import { createReducer } from 'redux-controller-middleware';
import { Recipe } from '~/models';

export class RecipeStore {
  recipesAreLoading: boolean;
  recipesMap: Map<Recipe['id'], Recipe>;

  constructor(store?: RecipeStore) {
    this.recipesAreLoading = false;
    this.recipesMap = store?.recipesMap ?? new Map();
  }

  static update = 'DISH_update_store';
  static reducer = createReducer(new RecipeStore(), RecipeStore.update);
}
