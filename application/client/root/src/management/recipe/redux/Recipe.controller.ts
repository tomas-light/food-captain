import type { Action } from 'redux-controller-middleware';
import {
  ControllerBase,
  createAction,
  Middleware,
  watch,
  WatchedController,
} from 'redux-controller-middleware';
import { RecipeForViewDto } from '@food-captain/api';
import { RecipeApi, TagApi } from '@food-captain/client-api';
import { NewRecipe, NewTag, Recipe, Tag, UpdatedRecipe } from '~/models';
import { RecipeStore } from './Recipe.store';
import { State } from '~State';

@watch
class RecipeController extends ControllerBase<State> {
  constructor(
    middleware: Middleware<State>,
    private readonly recipeApi: RecipeApi,
    private readonly tagApi: TagApi
  ) {
    super(middleware);
  }

  private updateStore(partialStore: Partial<RecipeStore>) {
    this.dispatch(createAction(RecipeStore.update, partialStore));
  }

  @watch
  async loadRecipes() {
    this.updateStore({ recipesAreLoading: true });

    const response = await this.recipeApi.getAllAsync();
    if (response.isFailed() || !response.data) {
      this.updateStore({
        recipesAreLoading: false,
        recipesMap: new Map(),
      });

      return;
    }

    const recipesMap = new Map();
    response.data.forEach((recipe) => {
      recipesMap.set(recipe.id, recipe);
    });

    this.updateStore({
      recipesAreLoading: false,
      recipesMap: recipesMap,
    });
  }

  @watch
  async loadTags() {
    this.updateStore({ tagsAreLoading: true });

    const response = await this.tagApi.getAllAsync();
    if (response.isFailed() || !response.data) {
      this.updateStore({
        tagsAreLoading: false,
        tagsMap: new Map(),
      });

      return;
    }

    const tagsMap = new Map();
    response.data.forEach((tag) => {
      tagsMap.set(tag.id, tag);
    });

    this.updateStore({
      tagsAreLoading: false,
      tagsMap: tagsMap,
    });
  }

  @watch
  async addTag(
    action: Action<{
      newTag: NewTag;
      getCreatedTag?: (createdTag: Tag) => void;
    }>
  ) {
    const { newTag, getCreatedTag } = action.payload;

    const recipeResponse = await this.tagApi.addAsync(newTag);
    if (recipeResponse.isFailed() || !recipeResponse.data) {
      return;
    }

    const { tagsMap } = this.getState().recipe;
    const newTagsMap = new Map(tagsMap);

    newTagsMap.set(recipeResponse.data.id, recipeResponse.data);

    this.updateStore({
      tagsMap: newTagsMap,
    });

    getCreatedTag?.(recipeResponse.data);
  }

  @watch
  async loadRecipeById(action: Action<{ recipeId: RecipeForViewDto['id'] }>) {
    const { recipeId } = action.payload;

    this.updateStore({ recipesAreLoading: true });

    const recipeResponse = await this.recipeApi.getByIdAsync(recipeId);
    if (recipeResponse.isFailed() || !recipeResponse.data) {
      this.updateStore({
        recipesAreLoading: false,
      });

      return;
    }

    const { recipesMap } = this.getState().recipe;
    const newRecipesMap = new Map(recipesMap);

    newRecipesMap.set(recipeResponse.data.id, recipeResponse.data);

    this.updateStore({
      recipesAreLoading: false,
      recipesMap: newRecipesMap,
    });
  }

  @watch
  async addRecipe(
    action: Action<{ recipe: NewRecipe; callback?: () => void }>
  ) {
    const { recipe, callback } = action.payload;

    const recipeResponse = await this.recipeApi.addAsync(recipe);
    if (recipeResponse.isFailed() || !recipeResponse.data) {
      return;
    }

    const { recipesMap } = this.getState().recipe;
    const newRecipesMap = new Map(recipesMap);

    newRecipesMap.set(recipeResponse.data.id, recipeResponse.data);

    this.updateStore({
      recipesMap: newRecipesMap,
    });

    callback?.();
  }

  @watch
  async updateRecipe(
    action: Action<{
      recipe: UpdatedRecipe;
      callback?: () => void;
    }>
  ) {
    const { recipe, callback } = action.payload;

    const recipeResponse = await this.recipeApi.updateAsync(recipe);
    if (recipeResponse.isFailed() || !recipeResponse.data) {
      return;
    }

    const { recipesMap } = this.getState().recipe;
    const newRecipesMap = new Map(recipesMap);

    newRecipesMap.set(recipeResponse.data.id, recipeResponse.data);

    this.updateStore({
      recipesMap: newRecipesMap,
    });

    callback?.();
  }

  @watch
  async deleteRecipe(
    action: Action<{ recipeId: Recipe['id']; callback?: () => void }>
  ) {
    const { recipeId, callback } = action.payload;

    const response = await this.recipeApi.deleteAsync(recipeId);
    if (response.isFailed() || !response.data) {
      return;
    }

    const { recipesMap } = this.getState().recipe;
    const newRecipesMap = new Map(recipesMap);
    newRecipesMap.delete(recipeId);

    this.updateStore({
      recipesMap: newRecipesMap,
    });

    callback?.();
  }
}

const recipeController: WatchedController<RecipeController> =
  RecipeController as any;
export { recipeController as RecipeController };
