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
import { UpdatedRecipe } from '~/models';
import { appUrls } from '~/routing/appUrls';
import {
  GalleryModal,
  GalleryModalRef,
  ImageFieldWithPreview,
} from '~/templates';
import { RecipeController } from './redux/Recipe.controller';
import { useRecipe } from './useRecipe';

export const EditRecipePage = () => {
  const { recipeId } = useParams();

  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useLocaleResource('recipe');
  useLocaleResource('ingredient');

  const ref = useRef<GalleryModalRef>(null);

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

  const loadedRecipe = useRecipe(recipeId);
  const [recipe, setRecipe] = useState<UpdatedRecipe | undefined>(loadedRecipe);

  const onSave = () => {
    if (recipe) {
      dispatch(
        RecipeController.updateRecipe({
          recipe,
          callback: () => navigate(appUrls.management.recipe.url()),
        })
      );
    }
  };

  const onDelete = () => {
    if (recipe) {
      dispatch(
        RecipeController.deleteRecipe({
          recipeId: recipe.id,
          callback: () => navigate(appUrls.management.recipe.url()),
        })
      );
    }
  };

  if (!recipe) {
    return <Typography>Dish recipe not found (id: {recipeId})</Typography>;
  }

  const onRecipeImageChanged = (imageId: number | undefined) => {
    setRecipe((_recipe) => ({
      ..._recipe!,
      image_id: imageId,
    }));
  };

  return (
    <>
      <Button onClick={() => navigate(appUrls.management.recipe.url())}>
        Back
      </Button>

      <Typography size={20}>{t('recipe.edit')}</Typography>

      <GalleryModal onChoose={onRecipeImageChanged} ref={ref} />

      <Typography size={18}>{t('recipe.recipe')}</Typography>

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

        {/* <TextAreaField
          label={t('recipe.description')}
          value={recipe.description ?? ''}
          onChange={(value) => {
            setRecipe((_recipe) => ({
              ..._recipe!,
              description: value,
            }));
          }}
        />*/}
      </div>

      <Button onClick={onSave}>{t('buttons.save')}</Button>
      <Button onClick={onDelete}>{t('buttons.delete')}</Button>
    </>
  );
};
