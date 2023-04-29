import { FC } from 'react';
import clsx from 'clsx';
import { Icon } from '@food-captain/client-shared';
import { CookingTimeFilter } from '~/management/recipe/Filters/CookingTimeFilter';
import { RecipeFilters } from '~/models';
import { Filter } from './Filter';
import { IngredientsFilter } from './IngredientsFilter';
import { KcalFilter } from './KcalFilter';
import { TagsFilter } from './TagsFilter';
import classes from './FiltersBlocks.module.scss';

type Props = {
  className?: string;
  filters: RecipeFilters;
  setFilters: (
    setter: RecipeFilters | ((filters: RecipeFilters) => RecipeFilters)
  ) => void;
};

export const FiltersBlocks: FC<Props> = (props) => {
  const { className, filters, setFilters } = props;

  return (
    <div className={clsx(classes.root, className)}>
      <Filter
        selected={Boolean(filters.tagIds?.length)}
        titleTranslationKey={'recipe.filters.includedTags'}
        onClear={() => {
          setFilters((state) => ({
            ...state,
            tagIds: undefined,
          }));
        }}
      >
        <TagsFilter
          tagIds={filters.tagIds}
          onChangeTags={(update) => {
            setFilters((state) => ({
              ...state,
              tagIds: update(state.tagIds),
            }));
          }}
        />
      </Filter>

      <Filter
        selected={Boolean(filters.includedIngredientIds?.length)}
        titleTranslationKey={'recipe.filters.includedIngredients'}
        onClear={() => {
          setFilters((state) => ({
            ...state,
            includedIngredientIds: undefined,
          }));
        }}
      >
        <IngredientsFilter
          ingredientIds={filters.includedIngredientIds}
          onChangeIngredients={(update) => {
            setFilters((state) => ({
              ...state,
              includedIngredientIds: update(state.includedIngredientIds),
            }));
          }}
        />
      </Filter>

      <Filter
        selected={Boolean(filters.excludedIngredientIds?.length)}
        titleTranslationKey={'recipe.filters.excludedIngredients'}
        onClear={() => {
          setFilters((state) => ({
            ...state,
            excludedIngredientIds: undefined,
          }));
        }}
      >
        <IngredientsFilter
          ingredientIds={filters.excludedIngredientIds}
          onChangeIngredients={(update) => {
            setFilters((state) => ({
              ...state,
              excludedIngredientIds: update(state.excludedIngredientIds),
            }));
          }}
        />
      </Filter>

      <Filter
        selected={filters.kcalLimit != null}
        titleTranslationKey={'recipe.filters.kcal.title'}
        titleBold
        icon={<Icon variant={'fire'} />}
        onClear={() => {
          setFilters((state) => ({
            ...state,
            kcalLimit: undefined,
          }));
        }}
      >
        <KcalFilter
          kcalLimit={filters.kcalLimit}
          onChange={(kcalLimit) => {
            setFilters((state) => ({
              ...state,
              kcalLimit: kcalLimit,
            }));
          }}
        />
      </Filter>

      <Filter
        selected={filters.cookingTimeLimit != null}
        titleTranslationKey={'recipe.filters.cookingTime.title'}
        titleBold
        icon={<Icon variant={'timer'} />}
        onClear={() => {
          setFilters((state) => ({
            ...state,
            kcalLimit: undefined,
          }));
        }}
      >
        <CookingTimeFilter
          cookingTimeLimit={filters.cookingTimeLimit}
          onChange={(cookingTimeLimit) => {
            setFilters((state) => ({
              ...state,
              cookingTimeLimit: cookingTimeLimit,
            }));
          }}
        />
      </Filter>
    </div>
  );
};
