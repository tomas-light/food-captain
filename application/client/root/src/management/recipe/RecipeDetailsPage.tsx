import { Badge } from '@chakra-ui/react';
import { use } from 'cheap-di-react';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Icon,
  Image,
  RichText,
  Typography,
} from '@food-captain/client-shared';
import { ImageApi } from '@food-captain/client-api';
import { useLocaleResource } from '~/config/i18next';
import { useTranslation } from '~/config/i18next/TranslationContext';
import { useSelector } from '~/config/redux/useSelector';
import { useTitle } from '~/Layout';
import { IngredientController } from '~/management/ingredient/redux';
import { RecipeController } from '~/management/recipe/redux';
import { appUrls } from '~/routing/appUrls';
import { colorSchemesMap } from './constants';
import classes from './RecipeDetailsPage.module.scss';

export const RecipeDetailsPage = () => {
  const { recipeId: recipeIdString } = useParams();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imageApi = use(ImageApi);

  const { dimensionsMap, ingredientsMap } = useSelector(
    (state) => state.ingredient
  );
  const { tagsMap } = useSelector((state) => state.recipe);

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
  const recipe = recipesMap.get(recipeId);

  useEffect(() => {
    if (!isNaN(recipeId)) {
      dispatch(RecipeController.loadRecipeById({ recipeId: recipeId }));
    }
  }, [recipeId]);

  const sortedDescriptionBlocks = useMemo(
    () =>
      recipe?.description?.blocks.sort(
        (left, right) => left.order - right.order
      ) ?? [],
    [recipe?.description?.blocks]
  );
  const stepBlocks = useMemo(
    () =>
      sortedDescriptionBlocks.filter((block) => block.type === 'step') ?? [],
    [sortedDescriptionBlocks]
  );

  useTitle(recipe?.name);

  if (!recipe) {
    return <Typography>Recipe not found (id: {recipeIdString})</Typography>;
  }

  return (
    <div className={classes.root}>
      <Image
        className={classes.image}
        src={recipe.image_id ? imageApi.makeUrl(recipe.image_id) : undefined}
      />

      <div className={classes.stats}>
        <div className={classes.kcal}>
          <Icon variant={'fire'} />
          <Typography>
            {t('recipe.view.kcal', { kcal: recipe.kcal ?? '-' })}
          </Typography>

          <Icon variant={'timer'} />
          <Typography>
            {t('recipe.view.minutes', {
              minutes: recipe.cooking_time_in_minutes ?? '-',
            })}
          </Typography>
        </div>

        <div className={classes.tags}>
          {recipe.tags.map(({ tag_id }) => {
            const tag = tagsMap.get(tag_id);
            const colorScheme = colorSchemesMap.get(tag?.color);
            return (
              <Badge
                key={tag_id}
                variant={'subtle'}
                colorScheme={colorScheme}
                as={'div'}
              >
                {tag?.name}
              </Badge>
            );
          })}
        </div>
      </div>

      <div className={classes.ingredients}>
        {recipe.ingredients.map(({ ingredient_id, size, dimension_id }) => {
          const ingredient = ingredientsMap.get(ingredient_id);
          const dimension = dimensionsMap.get(dimension_id);

          return (
            <div key={ingredient_id} className={classes.ingredient}>
              <Image
                className={classes.ingredientImage}
                src={
                  ingredient?.image_id
                    ? imageApi.makeUrl(ingredient.image_id)
                    : undefined
                }
              />

              <Typography className={classes.ingredientName}>
                {ingredient?.name}
              </Typography>

              <Typography className={classes.ingredientSize}>
                {size ?? '-'} {dimension?.short_name ?? ''}
              </Typography>
            </div>
          );
        })}
      </div>

      <div className={classes.description}>
        {sortedDescriptionBlocks.map((block) => {
          switch (block.type) {
            case 'step':
              const index = stepBlocks.findIndex(
                ({ reactId }) => reactId === block.reactId
              );
              return (
                <div key={block.reactId} className={classes.step}>
                  <span>{index + 1}</span>
                  <RichText value={block.content} />
                </div>
              );

            case 'text':
            default:
              return <RichText key={block.reactId} value={block.content} />;
          }
        })}
      </div>

      <Button
        className={classes.editButton}
        variant={'outline'}
        onClick={() => {
          navigate(
            appUrls.management.recipe.recipeId(recipe.id.toString()).edit.url()
          );
        }}
      >
        {t('recipe.edit')}
      </Button>
    </div>
  );
};
