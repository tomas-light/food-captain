import { CloseButton } from '@chakra-ui/react';
import { use } from 'cheap-di-react';
import { FC, useMemo } from 'react';
import { ImageApi } from '@food-captain/client-api';
import {
  Image,
  Option,
  SelectField,
  Typography,
} from '@food-captain/client-shared';
import { Ingredient } from '../../../models';
import { useTranslation } from '../../../config/i18next/TranslationContext';
import { useSelector } from '../../../config/redux/useSelector';
import classes from './IngredientsFilter.module.scss';

type Props = {
  ingredientIds?: Ingredient['id'][];
  onChangeIngredients: (
    update: (
      ingredientIds?: Ingredient['id'][]
    ) => undefined | Ingredient['id'][]
  ) => void;
};

export const IngredientsFilter: FC<Props> = (props) => {
  const { ingredientIds, onChangeIngredients } = props;

  const { t } = useTranslation();
  const imageApi = use(ImageApi);
  const { ingredientsMap } = useSelector((state) => state.ingredient);

  const ingredientDictionaries = useMemo(() => {
    const optionsMap = new Map<Ingredient['id'], Option>();
    const options = [] as Option<Ingredient['id']>[];

    const selectedIdsSet = new Set<Ingredient['id']>(ingredientIds ?? []);

    for (const ingredient of ingredientsMap.values()) {
      if (selectedIdsSet.has(ingredient.id)) {
        continue;
      }

      const option: Option<Ingredient['id']> = {
        label: ingredient.name ?? '<no name> for ingredient',
        value: ingredient.id,
      };
      optionsMap.set(ingredient.id, option);
      options.push(option);
    }

    return { options, optionsMap };
  }, [ingredientsMap, ingredientIds]);

  return (
    <>
      <SelectField
        placeholder={t('recipe.filters.search')}
        options={ingredientDictionaries.options}
        isSearchable={true}
        value={null} // we don't need to display selected value here
        onChange={(newTagOption) => {
          if (newTagOption) {
            const ingredientId = newTagOption.value;
            onChangeIngredients((selectedIds) => {
              const ingredientIdsSet = new Set(ingredientIds);
              if (ingredientIdsSet.has(ingredientId)) {
                return selectedIds;
              }

              return ingredientIds?.concat([ingredientId]) ?? [ingredientId];
            });
          }
        }}
      />

      <div className={classes.list}>
        {ingredientIds?.map((ingredientId) => {
          const ingredient = ingredientsMap.get(ingredientId);
          return (
            <div key={ingredientId}>
              <Image
                src={
                  ingredient?.image_id
                    ? imageApi.makeUrl(ingredient.image_id)
                    : undefined
                }
              />

              <Typography capitalize>{ingredient?.name}</Typography>

              <CloseButton
                size={'xs'}
                onClick={() => {
                  onChangeIngredients((selectedIds) => {
                    let ingredientIds = selectedIds?.filter(
                      (_ingredientId) => _ingredientId !== ingredientId
                    );
                    if (ingredientIds && !ingredientIds.length) {
                      ingredientIds = undefined;
                    }

                    return ingredientIds;
                  });
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
