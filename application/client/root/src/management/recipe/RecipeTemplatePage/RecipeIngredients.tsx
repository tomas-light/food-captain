import { use } from 'cheap-di-react';
import clsx from 'clsx';
import { FC, useMemo, useRef } from 'react';
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
import { IngredientsModal, IngredientsModalRef } from './IngredientsModal';
import classes from './RecipeIngredients.module.scss';

type Props = {
  className?: string;
  ingredients: RecipeIngredient[];
  onAddIngredient: (newIngredient: RecipeIngredient) => void;
  onChangeIngredient: (changedIngredient: RecipeIngredient) => void;
  onDeleteIngredient: (ingredientId: Ingredient['id']) => void;
};

const RecipeIngredients: FC<Props> = (props) => {
  const {
    className,
    ingredients,
    onAddIngredient,
    onChangeIngredient,
    onDeleteIngredient,
  } = props;

  const imageApi = use(ImageApi);
  const { t } = useTranslation();
  const ingredientsModalRef = useRef<IngredientsModalRef>(null);

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
    <div className={clsx(classes.root, className)}>
      <IngredientsModal
        addedIngredients={ingredients}
        onChoose={(ingredientId) => {
          const [anyDimension] = dimensionsMap.values();

          onAddIngredient({
            ingredient_id: ingredientId,
            dimension_id: anyDimension.id,
            size: 0,
          });
        }}
        ref={ingredientsModalRef}
      />

      <Typography>{t('recipe.ingredients')}</Typography>

      <IconButton
        icon={<Icon variant={'plus'} />}
        title={t('ingredient.add') ?? ''}
        onClick={() => {
          ingredientsModalRef.current?.onOpen();
        }}
      />

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
    </div>
  );
};

export { RecipeIngredients };
export type { Props as RecipeIngredientsProps };
