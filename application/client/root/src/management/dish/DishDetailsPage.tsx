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
import { useDishWithRecipe } from './useDishWithRecipe';

export const DishDetailsPage = () => {
  const { dishId } = useParams();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const imageApi = use(ImageApi);

  useLocaleResource('dish');
  useLocaleResource('recipe');

  const { dish, dishRecipesMap } = useDishWithRecipe(dishId);

  if (!dish) {
    return <p>Dish not found (id: {dishId})</p>;
  }

  if (!dishRecipesMap) {
    return <Typography>Dish recipes not found (id: {dishId})</Typography>;
  }

  const [firstKey] = dishRecipesMap.keys();
  const firstRecipe = dishRecipesMap.get(firstKey);

  if (!firstRecipe) {
    return <Typography>Dish recipe not found (id: {dishId})</Typography>;
  }

  return (
    <div>
      <Button onClick={() => navigate(appUrls.management.dish.url())}>
        {t('back')}
      </Button>

      <Typography size={20}>{dish.name}</Typography>

      <Image
        className={classes.imagePreview}
        src={dish.image_id ? imageApi.makeUrl(dish.image_id) : undefined}
      />

      <p>{dish.description}</p>

      <Typography size={18}>{t('dish.recipe')}</Typography>
      <RecipeDetails recipe={firstRecipe} />

      <Button
        onClick={() => {
          navigate(appUrls.management.dish.dishId(dishId).edit.url());
        }}
      >
        {t('dish.edit')}
      </Button>
    </div>
  );
};
