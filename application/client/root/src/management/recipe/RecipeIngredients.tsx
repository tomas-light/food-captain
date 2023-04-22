import { use } from 'cheap-di-react';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Icon,
  IconButton,
  Image,
  NumberField,
  Option,
  SelectField,
  Typography,
} from '@food-captain/client-shared';
import { ImageApi } from '@food-captain/client-api';
import { useSelector } from '~/config/redux/useSelector';
import { Ingredient, RecipeIngredient } from '~/models';
import classes from './RecipeTemplatePage.module.scss';

type Props = {
  ingredients: RecipeIngredient[];
  onChangeIngredient: (changedIngredient: RecipeIngredient) => void;
  onDeleteIngredient: (ingredientId: Ingredient['id']) => void;
};

const RecipeIngredients: FC<Props> = (props) => {
  const { ingredients, onChangeIngredient, onDeleteIngredient } = props;

  const imageApi = use(ImageApi);
  const { t } = useTranslation();

  const { dimensionsMap, ingredientsMap } = useSelector(
    (state) => state.ingredient
  );
  const dimensionOptions = useMemo(() => {
    const optionsMap = new Map();
    const options = [] as (Option & { name: string })[];

    for (const dimension of dimensionsMap.values()) {
      const option: Option & { name: string } = {
        label: dimension.short_name ?? '<no short_name> for dimension',
        name: dimension.name,
        value: dimension.id,
      };
      optionsMap.set(dimension.id, option);
      options.push(option);
    }

    return { options, optionsMap };
  }, [dimensionsMap]);

  return (
    <div>
      {ingredients.map(({ ingredient_id, size, dimension_id }) => {
        const ingredient = ingredientsMap.get(ingredient_id);

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

            <NumberField
              className={classes.ingredientCount}
              placeholder={t('common.count') ?? ''}
              size={'xs'}
              value={size ?? 0}
              onChange={(newSize) => {
                onChangeIngredient({
                  ingredient_id,
                  size: newSize ?? 0,
                  dimension_id,
                });
              }}
            />

            <SelectField
              className={classes.ingredientDimension}
              styleVariant={'tiny-flushed'}
              value={dimensionOptions.optionsMap.get(dimension_id)}
              options={dimensionOptions.options}
              isSearchable
              filterOption={(filterOption, inputValue) => {
                if (inputValue) {
                  const searchString = inputValue.trim().toLowerCase();
                  if (filterOption.data.name.includes(searchString)) {
                    return true;
                  }
                  return false;
                }
                return true;
              }}
              onChange={(newDimension) => {
                onChangeIngredient({
                  ingredient_id,
                  size,
                  dimension_id: newDimension?.value,
                });
              }}
            />

            <IconButton
              size={'xs'}
              className={classes.ingredientDelete}
              icon={<Icon variant={'minus'} />}
              onClick={() => {
                onDeleteIngredient(ingredient_id);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export { RecipeIngredients };
export type { Props as RecipeIngredientsProps };
