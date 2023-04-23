import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@food-captain/client-shared';
import { useLocaleResource } from '~/config/i18next';
import { useSelector } from '~/config/redux/useSelector';
import { IngredientController } from '~/management/ingredient/redux';
import { RecipeEditor } from '~/management/recipe/RecipeEditor';
import { RecipeEditorController } from '~/management/recipe/redux';
import { appUrls } from '~/routing/appUrls';
import { RecipeController } from './redux/Recipe.controller';

export const EditRecipePage = () => {
  const { recipeId: recipeIdString } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useLocaleResource('recipe');
  useLocaleResource('ingredient');

  useEffect(() => {
    dispatch(IngredientController.loadIngredients());
    dispatch(IngredientController.loadDimensions());
    dispatch(RecipeController.loadTags());
  }, []);

  const recipeId = useMemo(() => {
    if (recipeIdString == null) {
      return NaN;
    }
    return parseInt(recipeIdString, 10);
  }, [recipeIdString]);

  const { recipesMap } = useSelector((state) => state.recipe);

  useEffect(() => {
    if (recipeId != null) {
      dispatch(RecipeEditorController.startEditingRecipe({ recipeId }));
    }
  }, [recipeId]);

  const onSave = () => {
    dispatch(
      RecipeController.updateRecipe({
        callback: () => navigate(appUrls.management.recipe.url()),
      })
    );
  };

  if (!recipesMap.has(recipeId)) {
    return <Typography>Dish recipe not found (id: {recipeId})</Typography>;
  }

  return <RecipeEditor onSave={onSave} />;
};
