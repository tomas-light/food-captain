import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocaleResource } from '~/config/i18next';
import { useTranslation } from '~/config/i18next/TranslationContext';
import { useTitle } from '~/Layout';
import { IngredientController } from '~/management/ingredient/redux';
import { RecipeEditor } from '~/management/recipe/RecipeEditor';
import { appUrls } from '~/routing';
import { RecipeEditorController } from './redux';
import { RecipeController } from './redux/Recipe.controller';

export const AddRecipePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useLocaleResource('recipe');
  useLocaleResource('ingredient');

  useEffect(() => {
    dispatch(IngredientController.loadIngredients());
    dispatch(IngredientController.loadDimensions());
    dispatch(RecipeController.loadTags());
    dispatch(RecipeEditorController.startEditingNewRecipe());
  }, []);

  const onSave = () => {
    dispatch(
      RecipeController.addRecipe({
        callback: () => navigate(appUrls.management.recipe.url()),
      })
    );
  };
  const onResetDraft = () => {
    dispatch(RecipeEditorController.resetDraft({ mode: 'create' }));
  };

  useTitle(t('navigation.management_recipe_add'));

  return <RecipeEditor onSave={onSave} onResetDraft={onResetDraft} />;
};
