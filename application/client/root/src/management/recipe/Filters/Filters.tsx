import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Typography } from '@food-captain/client-shared';
import { useTranslation } from '~/config/i18next/TranslationContext';
import { useSelector } from '~/config/redux/useSelector';
import { KcalFilter } from '~/management/recipe/Filters/KcalFilter';
import { RecipeFiltersController } from '../redux/RecipeFilters.controller';
import { Filter } from './Filter';
import { IngredientsFilter } from './IngredientsFilter';
import { TagsFilter } from './TagsFilter';
import classes from './Filters.module.scss';

type Props = {
  className?: string;
  open: boolean;
  onClose: () => void;
};

const Filters: FC<Props> = (props) => {
  const { className, open, onClose } = props;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { filters } = useSelector((state) => state.recipe);

  const [stateFilters, setStateFilters] = useState(filters);

  useEffect(() => {
    if (filters !== stateFilters) {
      setStateFilters(filters);
    }
  }, [filters]);

  return (
    <div
      className={clsx(classes.root, className, {
        [classes.opened]: open,
        [classes.closed]: !open,
      })}
    >
      <div className={classes.layout}>
        <div className={classes.title}>
          <Typography capitalize>{t('recipe.filters.title')}</Typography>

          <Button
            className={clsx({
              [classes.hidden]: Object.keys(stateFilters).length === 0,
            })}
            color={'default'}
            variant={'ghost'}
            size={'sm'}
            onClick={() => {
              setStateFilters(() => ({}));
            }}
          >
            {t('recipe.filters.clear')}
          </Button>
        </div>

        <div className={classes.filters}>
          <Filter
            selected={Boolean(stateFilters.tagIds?.length)}
            titleTranslationKey={'recipe.filters.includedTags'}
            onClear={() => {
              setStateFilters((state) => ({
                ...state,
                tagIds: undefined,
              }));
            }}
          >
            <TagsFilter
              tagIds={stateFilters.tagIds}
              onChangeTags={(update) => {
                setStateFilters((state) => ({
                  ...state,
                  tagIds: update(state.tagIds),
                }));
              }}
            />
          </Filter>

          <Filter
            selected={Boolean(stateFilters.includedIngredientIds?.length)}
            titleTranslationKey={'recipe.filters.includedIngredients'}
            onClear={() => {
              setStateFilters((state) => ({
                ...state,
                includedIngredientIds: undefined,
              }));
            }}
          >
            <IngredientsFilter
              ingredientIds={stateFilters.includedIngredientIds}
              onChangeIngredients={(update) => {
                setStateFilters((state) => ({
                  ...state,
                  includedIngredientIds: update(state.includedIngredientIds),
                }));
              }}
            />
          </Filter>

          <Filter
            selected={Boolean(stateFilters.excludedIngredientIds?.length)}
            titleTranslationKey={'recipe.filters.excludedIngredients'}
            onClear={() => {
              setStateFilters((state) => ({
                ...state,
                excludedIngredientIds: undefined,
              }));
            }}
          >
            <IngredientsFilter
              ingredientIds={stateFilters.excludedIngredientIds}
              onChangeIngredients={(update) => {
                setStateFilters((state) => ({
                  ...state,
                  excludedIngredientIds: update(state.excludedIngredientIds),
                }));
              }}
            />
          </Filter>

          <Filter
            selected={stateFilters.kcalLimit != null}
            titleTranslationKey={'recipe.filters.kcal.title'}
            onClear={() => {
              setStateFilters((state) => ({
                ...state,
                kcalLimit: undefined,
              }));
            }}
          >
            <KcalFilter
              kcalLimit={stateFilters.kcalLimit}
              onChange={(kcalLimit) => {
                setStateFilters((state) => ({
                  ...state,
                  kcalLimit: kcalLimit,
                }));
              }}
            />
          </Filter>
        </div>

        <div className={classes.buttons}>
          <Button
            variant={'ghost'}
            color={'default'}
            onClick={() => {
              setStateFilters(filters);
              onClose();
            }}
          >
            {t('recipe.filters.cancel')}
          </Button>

          <Button
            variant={'outline'}
            onClick={() => {
              dispatch(
                RecipeFiltersController.loadRecipesByFilters({
                  filters: stateFilters,
                }).addNextActions(() => onClose())
              );
            }}
          >
            {t('recipe.filters.apply')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { Filters };
export type { Props as FiltersProps };
