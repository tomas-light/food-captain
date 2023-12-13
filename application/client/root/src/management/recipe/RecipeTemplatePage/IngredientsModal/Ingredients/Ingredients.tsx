import { Checkbox } from '@chakra-ui/react';
import { use } from 'cheap-di-react';
import clsx from 'clsx';
import { FC } from 'react';
import { Image } from '@food-captain/client-shared';
import { ImageApi } from '@food-captain/client-api';
import { Ingredient } from '../../../../../models';
import classes from './Ingredients.module.scss';

type Props = {
  className?: string;
  ingredients: Ingredient[];
  onIngredientClick?: (ingredientId: number, isDoubleClick?: true) => void;
  selectedIngredientIds: Set<Ingredient['id']>;
  searchString?: string;
};

const Ingredients: FC<Props> = (props) => {
  const {
    className,
    ingredients,
    onIngredientClick,
    searchString,
    selectedIngredientIds,
  } = props;

  const imageApi = use(ImageApi);

  return (
    <div className={clsx(classes.root, className)}>
      {ingredients
        .filter((ingredient) => {
          if (!searchString) {
            return true;
          }

          return (
            ingredient.name
              ?.toLocaleLowerCase()
              .includes(searchString.toLocaleLowerCase()) ?? true
          );
        })
        .map((ingredient) => (
          <div key={ingredient.id} className={classes.imageCard}>
            <Image
              src={
                ingredient.image_id
                  ? imageApi.makeUrl(ingredient.image_id)
                  : undefined
              }
              onClick={() => {
                onIngredientClick?.(ingredient.id);
              }}
              onDoubleClick={() => {
                onIngredientClick?.(ingredient.id, true);
              }}
            />

            <Checkbox
              className={classes.imageCheckbox}
              position={'absolute'}
              isChecked={selectedIngredientIds.has(ingredient.id)}
              disabled
            />
          </div>
        ))}
    </div>
  );
};

export { Ingredients };
export type { Props as GalleryProps };
