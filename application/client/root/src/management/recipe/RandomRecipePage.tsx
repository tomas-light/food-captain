import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ImageApi } from '@food-captain/client-api';
import { Button, Image, Typography } from '@food-captain/client-shared';
import { useTranslation } from '../../config/i18next/TranslationContext';
import { useLocaleResource } from '../../config/i18next';
import { IngredientController } from '../ingredient/redux';
import { useSelector } from '../../config/redux/useSelector';
import { appUrls } from '../../routing';
import { RecipeController } from './redux';
import { RecipeStats } from './RecipeStats';
import { RecipeFiltersController } from './redux/RecipeFilters.controller';
import { FiltersBlocks } from './Filters/FiltersBlocks';
import classes from './RandomRecipePage.module.scss';

export const RandomRecipePage = () => {
  const translation = useTranslation();
  const { t } = translation;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLocaleResource('recipe');
  useLocaleResource('ingredient');

  useEffect(() => {
    dispatch(IngredientController.loadIngredients());
    dispatch(IngredientController.loadDimensions());
    dispatch(RecipeController.loadTags());
  }, []);

  const { randomRecipe, filters } = useSelector((state) => state.recipe);

  const [stateFilters, setStateFilters] = useState(filters);

  useEffect(() => {
    if (filters !== stateFilters) {
      setStateFilters(filters);
    }
  }, [filters]);

  return (
    <div className={classes.root}>
      <div className={classes.recipeContainer}>
        {randomRecipe ? (
          <div className={classes.recipe}>
            <Typography className={classes.recipeName} size={18} bold>
              {randomRecipe.name}
            </Typography>

            <Image
              className={classes.recipeImage}
              src={ImageApi.makeUrl(randomRecipe.image_id)}
              onClick={() => {
                navigate(
                  appUrls.management.recipe
                    .recipeId(randomRecipe.id.toString())
                    .url()
                );
              }}
            />

            <RecipeStats
              classes={{
                root: classes.stats,
                kcal: classes.kcal,
                tags: classes.tags,
              }}
              recipe={randomRecipe}
            />
          </div>
        ) : (
          <div className={classes.noRecipe} />
        )}

        <Button
          className={classes.addButton}
          onClick={() => {
            dispatch(
              RecipeFiltersController.loadRandomRecipeByFilters({
                filters: stateFilters,
              })
            );
          }}
        >
          {t('recipe.takeRandom')}
        </Button>
      </div>

      <FiltersBlocks
        className={classes.filters}
        filters={stateFilters}
        setFilters={setStateFilters}
      />
    </div>
  );
};
