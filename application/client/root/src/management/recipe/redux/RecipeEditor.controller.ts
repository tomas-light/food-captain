import type { Action } from 'redux-controller-middleware';
import {
  createAction,
  Middleware,
  watch,
  WatchedController,
} from 'redux-controller-middleware';
import { NewRecipe, Recipe } from '~/models';
import { RecipeController } from './Recipe.controller';
import { RecipeStore } from './Recipe.store';
import { RecipeBaseController } from './RecipeBase.controller';
import { State } from '~State';

@watch
class RecipeEditorController extends RecipeBaseController {
  constructor(middleware: Middleware<State>) {
    super(middleware);
  }

  private updateStore(partialStore: Partial<RecipeStore>) {
    this.dispatch(createAction(RecipeStore.update, partialStore));
  }

  @watch
  startEditingNewRecipe() {
    const { editedRecipe } = this.getState().recipe;

    const hasNewRecipeDraft = editedRecipe && !('id' in editedRecipe);
    if (hasNewRecipeDraft) {
      // do not override draft if it exists
      return;
    }

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

    const hasTheRecipeDraft =
      editedRecipe && 'id' in editedRecipe && editedRecipe.id === recipeId;
    if (hasTheRecipeDraft) {
      // do not override draft if it exists
      return;
    }

    this.updateStore({
      editedRecipe: recipe,
    });
  }

  @watch
  resetDraft(action: Action<{ mode: 'create' | 'edit' }>) {
    const { mode } = action.payload;

    if (mode === 'create') {
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
    } else {
      const { editedRecipe, recipesMap } = this.getState().recipe;

      if (editedRecipe && 'id' in editedRecipe) {
        const recipe = recipesMap.get(editedRecipe.id);
        if (recipe) {
          this.updateStore({
            editedRecipe: recipe,
          });
        }
      }
    }
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
