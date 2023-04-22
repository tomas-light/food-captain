import { createReducer } from 'redux-controller-middleware';
import { Recipe, Tag } from '~/models';

export class RecipeStore {
  recipesAreLoading: boolean;
  recipesMap: Map<Recipe['id'], Recipe>;

  tagsAreLoading: boolean;
  tagsMap: Map<Tag['id'], Tag>;

  constructor(store?: RecipeStore) {
    this.recipesAreLoading = false;
    this.recipesMap = store?.recipesMap ?? new Map();

    this.tagsAreLoading = false;
    this.tagsMap = store?.tagsMap ?? new Map();
  }

  static update = 'DISH_update_store';
  static reducer = createReducer(new RecipeStore(), RecipeStore.update);
}
