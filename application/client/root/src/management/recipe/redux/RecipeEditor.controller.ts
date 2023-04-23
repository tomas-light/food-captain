import type { Action } from 'redux-controller-middleware';
import {
  ControllerBase,
  createAction,
  Middleware,
  watch,
  WatchedController,
} from 'redux-controller-middleware';
import { RecipeController } from '~/management/recipe/redux/Recipe.controller';
import { NewRecipe, Recipe } from '~/models';
import { RecipeStore } from './Recipe.store';
import { State } from '~State';

@watch
class RecipeEditorController extends ControllerBase<State> {
  constructor(middleware: Middleware<State>) {
    super(middleware);
  }

  private updateStore(partialStore: Partial<RecipeStore>) {
    this.dispatch(createAction(RecipeStore.update, partialStore));
  }

  @watch
  startEditingNewRecipe() {
    const { editedRecipe } = this.getState().recipe;
    if (!editedRecipe) {
      this.updateStore({
        editedRecipe: {
          name: '',
          description: {
            blocks: [],
          },
          ingredients: [],
          tags: [],
        },
      });
    }
  }

  @watch
  async startEditingRecipe(action: Action<{ recipeId: Recipe['id'] }>) {
    const { recipeId } = action.payload;

    const recipe = await new Promise<Recipe>((resolve) => {
      this.dispatch(
        RecipeController.loadRecipeById({
          recipeId: recipeId,
          callback: resolve,
        })
      );
    });

    const { editedRecipe } = this.getState().recipe;
    if (!recipe) {
      console.log('Recipe is not found in store');
      return;
    }
    if (editedRecipe && 'id' in editedRecipe && editedRecipe.id === recipeId) {
      // use restored draft
      console.log('Use recipe draft to editing');
      return;
    }

    this.updateStore({
      editedRecipe: recipe,
    });
  }

  @watch
  onChangeEditedRecipe(
    action: Action<{ updates: (recipe: NewRecipe) => Partial<NewRecipe> }>
  ) {
    const { editedRecipe } = this.getState().recipe;
    if (!editedRecipe) {
      return;
    }

    const { updates } = action.payload;

    this.updateStore({
      editedRecipe: {
        ...editedRecipe,
        ...updates(editedRecipe),
      },
    });
  }
}

const recipeController: WatchedController<RecipeEditorController> =
  RecipeEditorController as any;
export { recipeController as RecipeEditorController };
