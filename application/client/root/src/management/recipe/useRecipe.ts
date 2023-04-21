import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '~/config/redux/useSelector';
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
  const recipe = recipesMap.get(recipeId);

  useEffect(() => {
    if (!isNaN(recipeId)) {
      dispatch(RecipeController.loadRecipeById({ recipeId: recipeId }));
    }
  }, [recipeId]);

  return recipe;
}
