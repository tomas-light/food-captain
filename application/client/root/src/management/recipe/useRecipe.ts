import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { guid } from '@food-captain/client-utils';
import { useSelector } from '~/config/redux/useSelector';
import { Recipe } from '~/models';
import { RecipeController } from './redux/Recipe.controller';

export function useRecipe(recipeIdString: string | undefined) {
  const dispatch = useDispatch();

  const recipeId = useMemo(() => {
    if (recipeIdString == null) {
      return NaN;
    }
    return parseInt(recipeIdString, 10);
  }, [recipeIdString]);

  const { recipesMap } = useSelector((state) => state.recipe);
  const recipe = useMemo<Recipe | undefined>(() => {
    const loadedRecipe = recipesMap.get(recipeId);

    if (!loadedRecipe) {
      return undefined;
    }

    return {
      ...loadedRecipe,
      description: {
        blocks:
          loadedRecipe.description?.blocks.map((block) => ({
            ...block,
            reactId: guid(),
          })) ?? [],
      },
    };
  }, [recipeId, recipesMap]);

  useEffect(() => {
    if (!isNaN(recipeId)) {
      dispatch(RecipeController.loadRecipeById({ recipeId: recipeId }));
    }
  }, [recipeId]);

  return recipe;
}
