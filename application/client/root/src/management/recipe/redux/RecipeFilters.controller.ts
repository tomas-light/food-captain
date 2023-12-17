import type { Action } from 'redux-controller-middleware';
import {
  controller,
  Middleware,
  reducer,
  WatchedController,
} from 'redux-controller-middleware';
import { RecipeApi } from '@food-captain/client-api';
import { State } from '../../../config/redux/index';
import { Recipe, RecipeFilters } from '../../../models/index';
import { RecipeBaseController } from './RecipeBase.controller';

@controller
class RecipeFiltersController extends RecipeBaseController {
  constructor(
    middleware: Middleware<State>,
    private readonly recipeApi: RecipeApi
  ) {
    super(middleware);
  }

  @reducer
  async loadRecipesByFilters(action: Action<{ filters: RecipeFilters }>) {
    this.updateStoreSlice({ filteredRecipesAreLoading: true });
    const { filters } = action.payload;

    const response = await this.recipeApi.getRecipesByFilterAsync(filters);
    if (response.isFailed() || !response.data) {
      this.updateStoreSlice({
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

    this.updateStoreSlice({
      recipesMap: updatedRecipesMap,
      filteredRecipesAreLoading: false,
      filteredRecipesMap: filteredRecipesMap,
      filters,
    });
  }

  @reducer
  async loadRandomRecipeByFilters(action: Action<{ filters: RecipeFilters }>) {
    this.updateStoreSlice({
      randomRecipe: null,
      randomRecipeIsLoading: true,
    });
    const { filters } = action.payload;

    const response = await this.recipeApi.getRandomRecipeByFilterAsync(filters);
    if (response.isFailed() || !response.data) {
      this.updateStoreSlice({
        randomRecipeIsLoading: false,
      });

      return;
    }

    const randomRecipe = this.mapRecipeDescriptionDtoToDescription(
      response.data
    );

    this.updateStoreSlice({
      randomRecipeIsLoading: false,
      randomRecipe: randomRecipe,
    });
  }

  @reducer
  async loadMaxKcal() {
    this.updateStoreSlice({
      maxKcalIsLoading: true,
    });

    const response = await this.recipeApi.getMaxKcalAsync();
    if (response.isFailed() || !response.data) {
      this.updateStoreSlice({
        maxKcalIsLoading: false,
      });

      return;
    }

    this.updateStoreSlice({
      maxKcalIsLoading: true,
      maxKcal: response.data.maxKcal,
    });
  }

  @reducer
  async loadMaxCookingTime() {
    this.updateStoreSlice({
      maxCookingTimeIsLoading: true,
    });

    const response = await this.recipeApi.getMaxCookingTimeAsync();
    if (response.isFailed() || !response.data) {
      this.updateStoreSlice({
        maxCookingTimeIsLoading: false,
      });

      return;
    }

    this.updateStoreSlice({
      maxCookingTimeIsLoading: true,
      maxCookingTime: response.data.maxCookingTime,
    });
  }
}

const recipeFiltersController: WatchedController<RecipeFiltersController> =
  RecipeFiltersController as any;
export { recipeFiltersController as RecipeFiltersController };
