import { toast } from 'react-toastify';
import type { Action } from 'redux-controller-middleware';
import {
  controller,
  Middleware,
  reducer,
  WatchedController,
} from 'redux-controller-middleware';
import { RecipeForViewDto } from '@food-captain/api';
import { RecipeApi, TagApi } from '@food-captain/client-api';
import { State } from '../../../config/redux/index';
import { NewTag, Recipe, Tag } from '../../../models';
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

  @reducer
  async loadRecipes() {
    this.updateStoreSlice({ recipesAreLoading: true });

    const response = await this.recipeApi.getAllAsync();
    if (response.isFailed() || !response.data) {
      this.updateStoreSlice({
        recipesAreLoading: false,
        recipesMap: new Map(),
      });
      // todo: add localization
      toast('Не удалось загрузить рецепты', {
        type: 'error',
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

    this.updateStoreSlice({
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

    this.updateStoreSlice({ recipesAreLoading: true });

    const recipeResponse = await this.recipeApi.getByIdAsync(recipeId);
    if (recipeResponse.isFailed() || !recipeResponse.data) {
      this.updateStoreSlice({
        recipesAreLoading: false,
      });
      // todo: add localization
      toast(`Не удалось загрузить рецепт #${recipeId}`, {
        type: 'error',
      });

      return;
    }

    const { recipesMap } = this.getState().recipe;
    const newRecipesMap = new Map(recipesMap);

    const recipe = this.mapRecipeDescriptionDtoToDescription(
      recipeResponse.data
    );
    newRecipesMap.set(recipe.id, recipe);

    this.updateStoreSlice({
      recipesAreLoading: false,
      recipesMap: newRecipesMap,
    });

    callback?.(recipe);
  }

  @reducer
  async loadTags() {
    this.updateStoreSlice({ tagsAreLoading: true });

    const response = await this.tagApi.getAllAsync();
    if (response.isFailed() || !response.data) {
      this.updateStoreSlice({
        tagsAreLoading: false,
        tagsMap: new Map(),
      });
      // todo: add localization
      toast('Не удалось загрузить теги', {
        type: 'error',
      });

      return;
    }

    const tagsMap = new Map();
    response.data.forEach((tag) => {
      tagsMap.set(tag.id, tag);
    });

    this.updateStoreSlice({
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
      // todo: add localization
      toast('Не удалось добавить тег', {
        type: 'error',
      });
      return;
    }

    const { tagsMap } = this.getState().recipe;
    const newTagsMap = new Map(tagsMap);

    newTagsMap.set(recipeResponse.data.id, recipeResponse.data);

    this.updateStoreSlice({
      tagsMap: newTagsMap,
    });
    // todo: add localization
    toast(`Тег "${newTag.name}" добавлен`, {
      type: 'success',
    });

    getCreatedTag?.(recipeResponse.data);
  }

  @reducer
  async addRecipe(action: Action<{ callback?: () => void }>) {
    const { callback } = action.payload;
    const { editedRecipe } = this.getState().recipe;
    if (!editedRecipe) {
      // todo: add localization
      toast('Не удалось добавить рецепт', {
        type: 'error',
      });
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

    this.updateStoreSlice({
      recipesMap: newRecipesMap,
      editedRecipe: null,
    });
    // todo: add localization
    toast(`Рецепт "${recipe.name}" добавлен`, {
      type: 'success',
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
      // todo: add localization
      toast('Не найден редактируемый рецепт в store', {
        type: 'error',
      });
      return;
    }

    const recipeWithCorrectDescription: Recipe =
      this.mapRecipeDescriptionToDescriptionDto(editedRecipe);

    const recipeResponse = await this.recipeApi.updateAsync(
      recipeWithCorrectDescription
    );
    if (recipeResponse.isFailed() || !recipeResponse.data) {
      // todo: add localization
      toast('Не удалось сохранить рецепт', {
        type: 'error',
      });
      return;
    }

    const { recipesMap } = this.getState().recipe;
    const newRecipesMap = new Map(recipesMap);

    const recipe = this.mapRecipeDescriptionDtoToDescription(
      recipeResponse.data
    );
    newRecipesMap.set(recipe.id, recipe);

    this.updateStoreSlice({
      recipesMap: newRecipesMap,
      editedRecipe: null,
    });
    // todo: add localization
    toast(`Рецепт "${recipe.name}" изменён`, {
      type: 'success',
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
      // todo: add localization
      toast(`Не удалось удалить рецепт #${recipeId}`, {
        type: 'error',
      });
      return;
    }

    const { recipesMap } = this.getState().recipe;
    const newRecipesMap = new Map(recipesMap);
    newRecipesMap.delete(recipeId);

    this.updateStoreSlice({
      recipesMap: newRecipesMap,
    });
    // todo: add localization
    toast('Рецепт удалён', {
      type: 'success',
    });

    callback?.();
  }
}

const recipeController: WatchedController<RecipeController> =
  RecipeController as any;
export { recipeController as RecipeController };
