import { use } from 'cheap-di-react';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Image } from '@food-captain/client-shared';
import { ImageApi } from '@food-captain/client-api';
import { RecipeForViewDto } from '@food-captain/api';
import { useLocaleResource } from '~/config/i18next';
import { useSelector } from '~/config/redux/useSelector';
import classes from '~/management/ingredient/IngredientPageTemplate.module.scss';
import { IngredientController } from '~/management/ingredient/redux';
import { Dimension, Ingredient } from '~/models';

type Props = {
  recipe: RecipeForViewDto;
};

const RecipeDetails = (props: Props) => {
  const { recipe } = props;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { ingredients, dimensions } = useSelector((state) => state.ingredient);
  const imageApi = use(ImageApi);

  useLocaleResource('dish');
  useLocaleResource('recipe');

  const ingredientsMap = useMemo(
    () =>
      ingredients.reduce((map, ingredient) => {
        map.set(ingredient.id, ingredient);
        return map;
      }, new Map<Ingredient['id'], Ingredient>()),
    [ingredients]
  );
  const dimensionsMap = useMemo(
    () =>
      dimensions.reduce((map, dimension) => {
        map.set(dimension.id, dimension);
        return map;
      }, new Map<Dimension['id'] | null | undefined, Dimension>()),
    [dimensions]
  );

  useEffect(() => {
    dispatch(IngredientController.loadIngredients());
    dispatch(IngredientController.loadDimensions());
  }, []);

  if (!recipe) {
    return null;
  }

  return (
    <div>
      <label>{t('recipe.name')}</label>
      <p>{recipe.name}</p>

      <Image
        className={classes.imagePreview}
        src={recipe.image_id ? imageApi.makeUrl(recipe.image_id) : undefined}
      />

      <label>{t('recipe.ingredients')}</label>
      {recipe.ingredients.map((ingredientInRecipe) => {
        const ingredient = ingredientsMap.get(ingredientInRecipe.ingredient_id);
        const dimension = dimensionsMap.get(ingredientInRecipe.dimension_id);
        return (
          <div key={ingredientInRecipe.ingredient_id}>
            <p>{ingredient?.name}</p>
            <p>
              {ingredientInRecipe.size} ${dimension?.name}
            </p>
            <Image
              className={classes.imagePreview}
              src={
                ingredient?.image_id
                  ? imageApi.makeUrl(ingredient?.image_id)
                  : undefined
              }
            />
          </div>
        );
      })}

      <label>{t('recipe.description')}</label>
      <p>{recipe.description}</p>

      {/* <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {recipe.images.map((image_id) => (
          <Image
            className={classes.imagePreview}
            src={image_id ? imageApi.makeUrl(image_id) : undefined}
          />
        ))}
      </div>*/}
    </div>
  );
};

export { RecipeDetails };
export type { Props as RecipeProps };
