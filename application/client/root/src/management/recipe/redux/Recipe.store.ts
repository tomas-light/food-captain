import { createReducer } from 'redux-controller-middleware';
import { NewRecipe, Recipe, RecipeFilters, Tag } from '~/models';

export class RecipeStore {
  recipesAreLoading: boolean;
  recipesMap: Map<Recipe['id'], Recipe>;

  filters: RecipeFilters;
  filteredRecipesAreLoading: boolean;
  filteredRecipesMap: Map<Recipe['id'], Recipe>;

  tagsAreLoading: boolean;
  tagsMap: Map<Tag['id'], Tag>;

  editedRecipe: NewRecipe | Recipe | null;

  constructor(store?: RecipeStore) {
    this.recipesAreLoading = false;
    this.recipesMap = store?.recipesMap ?? new Map();

    this.filters = store?.filters ?? {};
    this.filteredRecipesAreLoading = false;
    this.filteredRecipesMap = store?.filteredRecipesMap ?? new Map();

    this.tagsAreLoading = false;
    this.tagsMap = store?.tagsMap ?? new Map();

    this.editedRecipe = store?.editedRecipe ?? null;
  }

  static update = 'RECIPE_update_store';
  static reducer = createReducer(new RecipeStore(), RecipeStore.update);
}
