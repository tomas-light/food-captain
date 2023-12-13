import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@food-captain/client-shared';
import { useLocaleResource } from '../../config/i18next';
import { IngredientController } from '../ingredient/redux';
import { useSelector } from '../../config/redux/useSelector';
import { appUrls } from '../../routing';
import { useTitle } from '../../Layout';
import { RecipeEditorController } from './redux';
import { RecipeController } from './redux/Recipe.controller';
import { RecipeEditor } from './RecipeEditor';

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
        callback: () =>
          navigate(
            appUrls.management.recipe.recipeId(recipeId.toString()).url()
          ),
      })
    );
  };
  const onResetDraft = () => {
    dispatch(RecipeEditorController.resetDraft({ mode: 'edit' }));
  };

  const recipe = recipesMap.get(recipeId);

  useTitle(recipe?.name);

  if (!recipe) {
    return <Typography>Dish recipe not found (id: {recipeId})</Typography>;
  }

  return <RecipeEditor onSave={onSave} onResetDraft={onResetDraft} />;
};
