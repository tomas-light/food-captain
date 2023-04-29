import type { Action } from 'redux-controller-middleware';
import {
  createAction,
  Middleware,
  watch,
  WatchedController,
} from 'redux-controller-middleware';
import { RecipeApi } from '@food-captain/client-api';
import { Recipe, RecipeFilters } from '~/models';
import { RecipeStore } from './Recipe.store';
import { RecipeBaseController } from './RecipeBase.controller';
import { State } from '~State';

@watch
class RecipeFiltersController extends RecipeBaseController {
  constructor(
    middleware: Middleware<State>,
    private readonly recipeApi: RecipeApi
  ) {
    super(middleware);
  }

  private updateStore(partialStore: Partial<RecipeStore>) {
    this.dispatch(createAction(RecipeStore.update, partialStore));
  }

  @watch
  async loadRecipesByFilters(action: Action<{ filters: RecipeFilters }>) {
    this.updateStore({ filteredRecipesAreLoading: true });
    const { filters } = action.payload;

    const response = await this.recipeApi.getRecipesByFilterAsync(filters);
    if (response.isFailed() || !response.data) {
      this.updateStore({
        filteredRecipesAreLoading: false,
        filters,
      });

      return;
    }

    const { recipesMap } = this.getState().recipe;
    const updatedRecipesMap = new Map(recipesMap);

    const filteredRecipesMap = new Map<Recipe['id'], Recipe>();
    response.data.forEach((recipeDto) => {
      const recipe = this.mapRecipeDescriptionDtoToDescription(recipeDto);
      filteredRecipesMap.set(recipeDto.id, recipe);
      updatedRecipesMap.set(recipeDto.id, recipe);
    });

    this.updateStore({
      recipesMap: updatedRecipesMap,
      filteredRecipesAreLoading: false,
      filteredRecipesMap: filteredRecipesMap,
      filters,
    });
  }

  @watch
  async loadRandomRecipeByFilters(action: Action<{ filters: RecipeFilters }>) {
    this.updateStore({
      randomRecipe: null,
      randomRecipeIsLoading: true,
    });
    const { filters } = action.payload;

    const response = await this.recipeApi.getRandomRecipeByFilterAsync(filters);
    if (response.isFailed() || !response.data) {
      this.updateStore({
        randomRecipeIsLoading: false,
      });

      return;
    }

    const randomRecipe = this.mapRecipeDescriptionDtoToDescription(
      response.data
    );

    this.updateStore({
      randomRecipeIsLoading: false,
      randomRecipe: randomRecipe,
    });
  }

  @watch
  async loadMaxKcal() {
    this.updateStore({
      maxKcalIsLoading: true,
    });

    const response = await this.recipeApi.getMaxKcalAsync();
    if (response.isFailed() || !response.data) {
      this.updateStore({
        maxKcalIsLoading: false,
      });

      return;
    }

    this.updateStore({
      maxKcalIsLoading: true,
      maxKcal: response.data.maxKcal,
    });
  }

  @watch
  async loadMaxCookingTime() {
    this.updateStore({
      maxCookingTimeIsLoading: true,
    });

    const response = await this.recipeApi.getMaxCookingTimeAsync();
    if (response.isFailed() || !response.data) {
      this.updateStore({
        maxCookingTimeIsLoading: false,
      });

      return;
    }

    this.updateStore({
      maxCookingTimeIsLoading: true,
      maxCookingTime: response.data.maxCookingTime,
    });
  }
}

const recipeFiltersController: WatchedController<RecipeFiltersController> =
  RecipeFiltersController as any;
export { recipeFiltersController as RecipeFiltersController };
