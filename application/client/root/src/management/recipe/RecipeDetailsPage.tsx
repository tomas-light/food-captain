import { use } from 'cheap-di-react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Button, Image, Typography } from '@food-captain/client-shared';
import { ImageApi } from '@food-captain/client-api';
import { useLocaleResource } from '~/config/i18next';
import classes from '~/management/ingredient/IngredientPageTemplate.module.scss';
import { appUrls } from '~/routing/appUrls';
import { RecipeDetails } from './RecipeDetails';
import { useRecipe } from './useRecipe';

export const RecipeDetailsPage = () => {
  const { dishId } = useParams();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const imageApi = use(ImageApi);

  useLocaleResource('recipe');

  const recipe = useRecipe(dishId);

  if (!recipe) {
    return <Typography>Recipe not found (id: {dishId})</Typography>;
  }

  return (
    <div>
      <Button onClick={() => navigate(appUrls.management.recipe.url())}>
        {t('back')}
      </Button>

      <Typography size={20}>{recipe.name}</Typography>

      <Image
        className={classes.imagePreview}
        src={recipe.image_id ? imageApi.makeUrl(recipe.image_id) : undefined}
      />

      {/* <p>{recipe.description}</p>*/}

      <Typography size={18}>{t('recipe.recipe')}</Typography>
      <RecipeDetails recipe={recipe} />

      <Button
        onClick={() => {
          navigate(appUrls.management.recipe.recipeId(dishId).edit.url());
        }}
      >
        {t('recipe.edit')}
      </Button>
    </div>
  );
};
