import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  NumberField,
  SelectField,
  TextAreaField,
  TextField,
  Typography,
} from '@food-captain/client-shared';
import { useLocaleResource } from '~/config/i18next';
import { useSelector } from '~/config/redux/useSelector';
import classes from '~/management/ingredient/IngredientPageTemplate.module.scss';
import { UpdatedDish, UpdatedRecipe } from '~/models';
import { appUrls } from '~/routing/appUrls';
import {
  GalleryModal,
  GalleryModalRef,
  ImageFieldWithPreview,
} from '~/templates';
import { DishController } from './redux/Dish.controller';
import { useDishWithRecipe } from './useDishWithRecipe';

export const EditDishPage = () => {
  const { dishId } = useParams();

  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useLocaleResource('dish');
  useLocaleResource('recipe');
  useLocaleResource('ingredient');

  const ref = useRef<GalleryModalRef>(null);
  const galleryModeRef = useRef<{ mode: 'dish' | 'recipe' | null }>({
    mode: null,
  });

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
    if (dish && recipe) {
      dispatch(
        DishController.updateDish({
          dish,
          recipe,
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

  const onDishImageChanged = (imageId: number | undefined) => {
    setDish((_dish) => ({
      ..._dish!,
      image_id: imageId,
    }));
  };
  const onRecipeImageChanged = (imageId: number | undefined) => {
    setRecipe((_recipe) => ({
      ..._recipe!,
      image_id: imageId,
    }));
  };
  const onImageSelectedInGallery = (imageId: number | undefined) => {
    switch (galleryModeRef.current.mode) {
      case 'dish':
        onDishImageChanged(imageId);
        break;

      case 'recipe':
        onRecipeImageChanged(imageId);
        break;

      default:
        console.warn('Gallery is not correct mode');
    }
  };

  return (
    <>
      <Button onClick={() => navigate(appUrls.management.dish.url())}>
        Back
      </Button>

      <Typography size={20}>{t('dish.edit')}</Typography>

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
            setDish((_dish) => ({ ..._dish!, name: value }));
          }}
        />

        <ImageFieldWithPreview
          className={classes.imageField}
          imageId={dish.image_id}
          imageTags={['ingredient']}
          onImageChanged={onDishImageChanged}
          onOpenGallery={() => {
            galleryModeRef.current.mode = 'dish';
            ref.current?.onOpen();
          }}
        />

        <TextAreaField
          label={t('dish.description')}
          value={dish.description ?? ''}
          onChange={(value) => {
            setDish((_dish) => ({ ..._dish!, description: value }));
          }}
        />
      </div>

      <GalleryModal onChoose={onImageSelectedInGallery} ref={ref} />

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
              ..._recipe!,
              name: value,
            }));
          }}
        />

        <ImageFieldWithPreview
          className={classes.imageField}
          imageId={recipe.image_id}
          imageTags={['recipe']}
          onImageChanged={onRecipeImageChanged}
          onOpenGallery={() => {
            galleryModeRef.current.mode = 'recipe';
            ref.current?.onOpen();
          }}
        />

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
                    const _ingredients = [..._recipe!.ingredients];
                    _ingredients.splice(index, 1, {
                      size: ingredient.size,
                      dimension_id: ingredient.dimension_id,
                      ingredient_id:
                        option?.value ?? (null as unknown as number),
                    });

                    return {
                      ..._recipe!,
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
                    const _ingredients = [..._recipe!.ingredients];
                    _ingredients.splice(index, 1, {
                      ...ingredient,
                      dimension_id: option?.value,
                    });

                    return {
                      ..._recipe!,
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
                    const _ingredients = [..._recipe!.ingredients];
                    _ingredients.splice(index, 1, {
                      ...ingredient,
                      size: value ?? 0,
                    });

                    return {
                      ..._recipe!,
                      ingredients: _ingredients,
                    };
                  });
                }}
              />

              <Button
                color={'destructive'}
                onClick={() => {
                  setRecipe((_recipe) => {
                    const _ingredients = [..._recipe!.ingredients];
                    _ingredients.splice(index, 1);

                    return {
                      ..._recipe!,
                      ingredients: _ingredients,
                    };
                  });
                }}
              >
                {t('ingredient.delete')}
              </Button>
            </li>
          ))}

          <Button
            onClick={() => {
              setRecipe((_recipe) => ({
                ..._recipe!,
                ingredients: _recipe!.ingredients.concat([
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
              ..._recipe!,
              description: value,
            }));
          }}
        />
      </div>

      <Button onClick={save}>{t('buttons.save')}</Button>
      <Button onClick={remove}>{t('buttons.delete')}</Button>
    </>
  );
};
