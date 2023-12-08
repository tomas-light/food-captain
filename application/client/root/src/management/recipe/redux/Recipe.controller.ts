import type { Action } from 'redux-controller-middleware';
import {
  controller,
  Middleware,
  reducer,
  updateStoreSlice,
  WatchedController,
} from 'redux-controller-middleware';
import { RecipeApi, TagApi } from '@food-captain/client-api';
import { RecipeForViewDto } from '@food-captain/api';
import { State } from '../../../config/redux/index';
import { NewTag, Recipe, Tag } from '../../../models';
import { RecipeStore } from './Recipe.store';
import { RecipeBaseController } from './RecipeBase.controller';

@controller
class RecipeController extends RecipeBaseController {
  constructor(
    middleware: Middleware<State>,
    private readonly recipeApi: RecipeApi,
    private readonly tagApi: TagApi
  ) {
    super(middleware);
  }

  private updateStore(partialStore: Partial<RecipeStore>) {
    this.dispatch(updateStoreSlice(RecipeStore)(partialStore));
  }

  @reducer
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

    const recipesMap = new Map<Recipe['id'], Recipe>();
    response.data.forEach((recipe) => {
      recipesMap.set(
        recipe.id,
        this.mapRecipeDescriptionDtoToDescription(recipe)
      );
    });

    this.updateStore({
      recipesAreLoading: false,
      recipesMap: recipesMap,
    });
  }

  @reducer
  async loadRecipeById(
    action: Action<{
      recipeId: RecipeForViewDto['id'];
      callback?: (recipe: Recipe) => void;
    }>
  ) {
    const { recipeId, callback } = action.payload;

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

    const recipe = this.mapRecipeDescriptionDtoToDescription(
      recipeResponse.data
    );
    newRecipesMap.set(recipe.id, recipe);

    this.updateStore({
      recipesAreLoading: false,
      recipesMap: newRecipesMap,
    });

    callback?.(recipe);
  }

  @reducer
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

  @reducer
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

  @reducer
  async addRecipe(action: Action<{ callback?: () => void }>) {
    const { callback } = action.payload;
    const { editedRecipe } = this.getState().recipe;
    if (!editedRecipe) {
      return;
    }

    const recipeWithCorrectDescription: typeof editedRecipe =
      this.mapRecipeDescriptionToDescriptionDto(editedRecipe);

    const recipeResponse = await this.recipeApi.addAsync(
      recipeWithCorrectDescription
    );
    if (recipeResponse.isFailed() || !recipeResponse.data) {
      return;
    }

    const { recipesMap } = this.getState().recipe;
    const newRecipesMap = new Map(recipesMap);

    const recipe = this.mapRecipeDescriptionDtoToDescription(
      recipeResponse.data
    );
    newRecipesMap.set(recipe.id, recipe);

    this.updateStore({
      recipesMap: newRecipesMap,
      editedRecipe: null,
    });

    callback?.();
  }

  @reducer
  async updateRecipe(
    action: Action<{
      callback?: () => void;
    }>
  ) {
    const { callback } = action.payload;
    const { editedRecipe } = this.getState().recipe;
    if (!editedRecipe || !('id' in editedRecipe)) {
      return;
    }

    const recipeWithCorrectDescription: Recipe =
      this.mapRecipeDescriptionToDescriptionDto(editedRecipe);

    const recipeResponse = await this.recipeApi.updateAsync(
      recipeWithCorrectDescription
    );
    if (recipeResponse.isFailed() || !recipeResponse.data) {
      return;
    }

    const { recipesMap } = this.getState().recipe;
    const newRecipesMap = new Map(recipesMap);

    const recipe = this.mapRecipeDescriptionDtoToDescription(
      recipeResponse.data
    );
    newRecipesMap.set(recipe.id, recipe);

    this.updateStore({
      recipesMap: newRecipesMap,
      editedRecipe: null,
    });

    callback?.();
  }

  @reducer
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
