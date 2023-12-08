import { ControllerBase } from 'redux-controller-middleware';
import { NewRecipeDto } from '@food-captain/api';
import { guid } from '@food-captain/client-utils';
import { State } from '../../../config/redux/index';
import { NewRecipe } from '../../../models/index';

export class RecipeBaseController extends ControllerBase<State> {
  protected mapRecipeDescriptionToDescriptionDto<T extends NewRecipe>(
    recipe: T
  ) {
    return {
      ...recipe,
      description: {
        blocks: (recipe.description?.blocks ?? []).map((block) => ({
          content: block.content,
          order: block.order,
          type: block.type,
        })),
      },
    };
  }

  protected mapRecipeDescriptionDtoToDescription<T extends NewRecipeDto>(
    recipeDto: T
  ) {
    return {
      ...recipeDto,
      description: {
        blocks:
          recipeDto.description?.blocks.map((block) => ({
            ...block,
            reactId: guid(),
          })) ?? [],
      },
    };
  }
}
