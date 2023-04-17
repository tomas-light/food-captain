import { use } from 'cheap-di-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Image,
  ImageField,
  TextAreaField,
  TextField,
  Typography,
} from '@food-captain/client-shared';
import { ImageApi } from '@food-captain/client-api';
import { useLocaleResource } from '~/config/i18next';
import classes from '~/management/ingredient/IngredientPageTemplate.module.scss';
import { UpdatedDish, UpdatedRecipe } from '~/models';
import { appUrls } from '~/routing/appUrls';
import { DishController } from './redux/Dish.controller';
import { useDishWithRecipe } from './useDishWithRecipe';

export const EditDishPage = () => {
  const { dishId } = useParams();

  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const imageApi = use(ImageApi);

  useLocaleResource('dish');
  useLocaleResource('recipe');

  const { dish: storedDish, dishRecipesMap } = useDishWithRecipe(dishId);
  const [dish, setDish] = useState<UpdatedDish | undefined>(storedDish);
  // todo: there may be many recipes
  const [recipe, setRecipe] = useState<UpdatedRecipe | undefined>();

  useEffect(() => {
    if (dish !== storedDish) {
      setDish(storedDish);
    }
  }, [storedDish]);

  useEffect(() => {
    if (dishRecipesMap) {
      const [firstKey] = dishRecipesMap.keys();
      const firstRecipe = dishRecipesMap.get(firstKey);
      setRecipe(firstRecipe);
    }
  }, [dishRecipesMap]);

  const save = () => {
    if (dish) {
      dispatch(
        DishController.updateDish({
          dish,
          callback: () => navigate(appUrls.management.dish.url()),
        })
      );
    }
  };

  const remove = () => {
    if (dish) {
      dispatch(
        DishController.removeDish({
          dishId: dish.id,
          callback: () => navigate(appUrls.management.dish.url()),
        })
      );
    }
  };

  if (!dish) {
    return <Typography>Dish not found (id: {dishId})</Typography>;
  }

  if (!dishRecipesMap) {
    return <Typography>Dish recipes not found (id: {dishId})</Typography>;
  }

  if (!recipe) {
    return <Typography>Dish recipe not found (id: {dishId})</Typography>;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        rowGap: '16px',
      }}
    >
      <Button onClick={() => navigate(appUrls.management.dish.url())}>
        Back
      </Button>

      <Typography size={20}>{t('dish.edit')}</Typography>

      <TextField
        label={t('dish.name')}
        value={dish.name}
        onChange={(value) => {
          setDish((_dish) => ({ ..._dish!, name: value }));
        }}
      />

      <ImageField
        className={classes.imageField}
        label={dish.image_id ? `#${dish.image_id.toString()}` : t('dish.image')}
        onChange={async (imageFile) => {
          const response = await imageApi.addAsync(imageFile, ['dish']);
          if (response.isFailed() || !response.data) {
            console.warn('image is no uploaded');
            return;
          }

          setDish((_dish) => ({
            ..._dish!,
            image_id: response.data!.imageId,
          }));
        }}
      />

      <Image
        className={classes.imagePreview}
        src={dish.image_id ? imageApi.makeUrl(dish.image_id) : undefined}
      />

      <TextAreaField
        label={t('dish.description')}
        value={dish.description ?? ''}
        onChange={(value) => {
          setDish((_dish) => ({ ..._dish!, description: value }));
        }}
      />

      <Typography size={18}>{t('dish.recipes')}</Typography>

      <TextField
        label={t('recipe.name')}
        value={recipe.name ?? ''}
        onChange={(value) => {
          setRecipe((_recipe) => ({
            ..._recipe!,
            name: value,
          }));
        }}
      />

      <ImageField
        className={classes.imageField}
        label={
          recipe.image_id ? `#${recipe.image_id.toString()}` : t('recipe.image')
        }
        onChange={async (imageFile) => {
          const response = await imageApi.addAsync(imageFile, ['recipe']);
          if (response.isFailed() || !response.data) {
            console.warn('image is no uploaded');
            return;
          }
          setRecipe((_recipe) => ({
            ..._recipe!,
            image_id: response.data!.imageId,
          }));
        }}
      />

      <Image
        className={classes.imagePreview}
        src={recipe.image_id ? imageApi.makeUrl(recipe.image_id) : undefined}
      />

      <TextAreaField
        label={t('recipe.description')}
        value={recipe.description ?? ''}
        onChange={(value) => {
          setRecipe((_recipe) => ({
            ..._recipe!,
            description: value,
          }));
        }}
      />

      <Button onClick={save}>{t('save')}</Button>
      <Button onClick={remove}>{t('delete')}</Button>
    </div>
  );
};
