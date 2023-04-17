import { use } from 'cheap-di-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Icon,
  Image,
  ImageField,
  NumberField,
  SelectField,
  TextAreaField,
  TextField,
  Typography,
} from '@food-captain/client-shared';
import { ImageApi } from '@food-captain/client-api';
import { useLocaleResource } from '~/config/i18next';
import { useSelector } from '~/config/redux/useSelector';
import { Gallery } from '~/Gallery';
import classes from '~/management/ingredient/IngredientPageTemplate.module.scss';
import { IngredientController } from '~/management/ingredient/redux';
import { NewDish, NewRecipe } from '~/models';
import { appUrls } from '~/routing';
import { DishController } from './redux/Dish.controller';

export const AddDishPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imageApi = use(ImageApi);

  useLocaleResource('dish');
  useLocaleResource('recipe');

  const ingredients = useSelector((state) => state.ingredient.ingredients);
  const dimensions = useSelector((state) => state.ingredient.dimensions);

  const ingredientOptions = useMemo(
    () =>
      ingredients.map((ingredient) => ({
        label: ingredient.name ?? '<no name> for ingredient',
        value: ingredient.id,
      })),
    [ingredients]
  );

  const dimensionOptions = useMemo(
    () =>
      dimensions.map((dimension) => ({
        label: dimension.name ?? '<no name> for dimension',
        value: dimension.id,
      })),
    [dimensions]
  );

  useEffect(() => {
    dispatch(IngredientController.loadIngredients());
    dispatch(IngredientController.loadDimensions());
  }, []);

  const [dish, setDish] = useState<NewDish>({
    name: '',
  });
  const [recipe, setRecipe] = useState<NewRecipe>({
    name: '',
    dish_id: null as unknown as number,
    ingredients: [],
  });
  const [gallerySearch, setGallerySearch] = useState('');

  const save = () => {
    dispatch(
      DishController.addDish({
        dish,
        recipe,
        callback: () => navigate(appUrls.management.dish.url()),
      })
    );
  };

  return (
    <>
      <Button onClick={() => navigate(appUrls.management.dish.url())}>
        Back
      </Button>

      <Typography size={20}>{t('dish.add')}</Typography>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '16px',
        }}
      >
        <TextField
          label={t('dish.name')}
          value={dish.name}
          onChange={(value) => {
            setDish((_dish) => ({ ..._dish, name: value }));
          }}
        />

        <ImageField
          className={classes.imageField}
          label={
            dish.image_id ? `#${dish.image_id.toString()}` : t('dish.image')
          }
          onChange={async (imageFile) => {
            const response = await imageApi.addAsync(imageFile, ['dish']);
            if (response.isFailed() || !response.data) {
              console.warn('image is no uploaded');
              return;
            }
            setDish((_dish) => ({
              ..._dish,
              image_id: response.data!.imageId,
            }));
          }}
        />

        <Image
          className={classes.imagePreview}
          src={dish.image_id ? imageApi.makeUrl(dish.image_id) : undefined}
        />

        <div className={classes.gallery}>
          <Typography className={classes.galleryTitle}>
            {t('common.gallery')}
          </Typography>

          <TextField
            className={classes.search}
            icon={<Icon variant={'imageSearch'} />}
            label={t('common.imageSearch')}
            value={gallerySearch}
            onChange={setGallerySearch}
            disabled // todo: remove, when filter will be added
          />

          <Gallery
            searchString={gallerySearch}
            onImageClick={(imageId) => {
              setDish((_dish) => ({
                ..._dish,
                image_id: imageId,
              }));
            }}
            selectedImageId={dish.image_id}
          />
        </div>

        <TextAreaField
          label={t('dish.description')}
          value={dish.description ?? ''}
          onChange={(value) => {
            setDish((_dish) => ({ ..._dish, description: value }));
          }}
        />
      </div>

      <Typography size={18}>{t('dish.recipe')}</Typography>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '16px',
        }}
      >
        <TextField
          label={t('recipe.name')}
          value={recipe.name ?? ''}
          onChange={(value) => {
            setRecipe((_recipe) => ({
              ..._recipe,
              name: value,
            }));
          }}
        />

        <ImageField
          className={classes.imageField}
          label={
            recipe.image_id
              ? `#${recipe.image_id.toString()}`
              : t('recipe.image')
          }
          onChange={async (imageFile) => {
            const response = await imageApi.addAsync(imageFile, ['recipe']);
            if (response.isFailed() || !response.data) {
              console.warn('image is no uploaded');
              return;
            }
            setRecipe((_recipe) => ({
              ..._recipe,
              image_id: response.data!.imageId,
            }));
          }}
        />

        <Image
          className={classes.imagePreview}
          src={recipe.image_id ? imageApi.makeUrl(recipe.image_id) : undefined}
        />

        <div className={classes.gallery}>
          <Typography className={classes.galleryTitle}>
            {t('common.gallery')}
          </Typography>

          <TextField
            className={classes.search}
            icon={<Icon variant={'imageSearch'} />}
            label={t('common.imageSearch')}
            value={gallerySearch}
            onChange={setGallerySearch}
            disabled // todo: remove, when filter will be added
          />

          <Gallery
            searchString={gallerySearch}
            onImageClick={(imageId) => {
              setRecipe((_recipe) => ({
                ..._recipe,
                image_id: imageId,
              }));
            }}
            selectedImageId={recipe.image_id}
          />
        </div>

        <Typography size={18}>{t('recipe.ingredients')}</Typography>
        <ul
          style={{
            padding: '0 24px',
            rowGap: '24px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              <SelectField
                label={t('ingredient.one')}
                options={ingredientOptions}
                value={
                  ingredientOptions.find(
                    (option) => option.value === ingredient.ingredient_id
                  ) ?? null
                }
                onChange={(option) =>
                  setRecipe((_recipe) => {
                    const _ingredients = [..._recipe.ingredients];
                    _ingredients.splice(index, 1, { ...ingredient, ...option });

                    return {
                      ..._recipe,
                      ingredients: _ingredients,
                    };
                  })
                }
              />

              <SelectField
                label={t('dimension.one')}
                options={dimensionOptions}
                value={
                  dimensionOptions.find(
                    (option) => option.value === ingredient.dimension_id
                  ) ?? null
                }
                onChange={(option) => {
                  setRecipe((_recipe) => {
                    const _ingredients = [..._recipe.ingredients];
                    _ingredients.splice(index, 1, {
                      ...ingredient,
                      dimension_id: option?.value,
                    });

                    return {
                      ..._recipe,
                      ingredients: _ingredients,
                    };
                  });
                }}
              />

              <NumberField
                label={t('dimension.size')}
                value={ingredient.size ?? 0}
                onChange={(value) => {
                  setRecipe((_recipe) => {
                    const _ingredients = [..._recipe.ingredients];
                    _ingredients.splice(index, 1, {
                      ...ingredient,
                      size: value ?? 0,
                    });

                    return {
                      ..._recipe,
                      ingredients: _ingredients,
                    };
                  });
                }}
              />
            </li>
          ))}

          <Button
            onClick={() => {
              setRecipe((_recipe) => ({
                ..._recipe,
                ingredients: _recipe.ingredients.concat([
                  {
                    ingredient_id: ingredients[0]?.id,
                    size: 0,
                    dimension_id: dimensions[0]?.id,
                  },
                ]),
              }));
            }}
          >
            {t('ingredient.add')}
          </Button>
        </ul>

        <TextAreaField
          label={t('recipe.description')}
          value={recipe.description ?? ''}
          onChange={(value) => {
            setRecipe((_recipe) => ({
              ..._recipe,
              description: value,
            }));
          }}
        />
      </div>

      <Button onClick={save}>{t('save')}</Button>
    </>
  );
};
