import { storeSlice } from 'redux-controller-middleware';
import { NewRecipe, Recipe, RecipeFilters, Tag } from '../../../models/index';

@storeSlice
export class RecipeStoreSlice {
  recipesAreLoading: boolean;
  recipesMap: Map<Recipe['id'], Recipe>;

  filters: RecipeFilters;
  filteredRecipesAreLoading: boolean;
  filteredRecipesMap: Map<Recipe['id'], Recipe>;

  randomRecipeIsLoading: boolean;
  randomRecipe: Recipe | null;

  maxKcalIsLoading: boolean;
  maxKcal: Recipe['kcal'] | undefined;

  maxCookingTimeIsLoading: boolean;
  maxCookingTime: Recipe['cooking_time_in_minutes'] | undefined;

  tagsAreLoading: boolean;
  tagsMap: Map<Tag['id'], Tag>;

  editedRecipe: NewRecipe | Recipe | null;

  constructor(store?: RecipeStoreSlice) {
    this.recipesAreLoading = false;
    this.recipesMap = store?.recipesMap ?? new Map();

    this.filters = store?.filters ?? {};
    this.filteredRecipesAreLoading = false;
    this.filteredRecipesMap = store?.filteredRecipesMap ?? new Map();

    this.randomRecipeIsLoading = false;
    this.randomRecipe = store?.randomRecipe ?? null;

    this.maxKcalIsLoading = false;
    this.maxKcal = store?.maxKcal;

    this.maxCookingTimeIsLoading = false;
    this.maxCookingTime = store?.maxCookingTime;

    this.tagsAreLoading = false;
    this.tagsMap = store?.tagsMap ?? new Map();

    this.editedRecipe = store?.editedRecipe ?? null;
  }
}
