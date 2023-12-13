import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../config/i18next/TranslationContext';
import { useLocaleResource } from '../../config/i18next';
import { IngredientController } from '../ingredient/redux';
import { appUrls } from '../../routing';
import { useTitle } from '../../Layout';
import { RecipeController } from './redux/Recipe.controller';
import { RecipeEditorController } from './redux';
import { RecipeEditor } from './RecipeEditor';

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
