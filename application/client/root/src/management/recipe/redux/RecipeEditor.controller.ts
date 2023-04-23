import type { Action } from 'redux-controller-middleware';
import {
  ControllerBase,
  createAction,
  Middleware,
  watch,
  WatchedController,
} from 'redux-controller-middleware';
import { NewRecipe } from '~/models';
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
