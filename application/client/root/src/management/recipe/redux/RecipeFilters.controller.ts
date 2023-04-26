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

    const filteredRecipesMap = new Map<Recipe['id'], Recipe>();
    response.data.forEach((recipe) => {
      filteredRecipesMap.set(
        recipe.id,
        this.mapRecipeDescriptionDtoToDescription(recipe)
      );
    });

    this.updateStore({
      filteredRecipesAreLoading: false,
      filteredRecipesMap: filteredRecipesMap,
      filters,
    });
  }
}

const recipeFiltersController: WatchedController<RecipeFiltersController> =
  RecipeFiltersController as any;
export { recipeFiltersController as RecipeFiltersController };
