import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Icon,
  IconButton,
  Image,
  Option,
  SelectField,
  TextField,
  Typography,
  useToggler,
} from '@food-captain/client-shared';
import { ImageApi } from '@food-captain/client-api';
import { useLocaleResource } from '~/config/i18next';
import { useTranslation } from '~/config/i18next/TranslationContext';
import { useSelector } from '~/config/redux/useSelector';
import { Filters } from '~/management/recipe/Filters';
import { selectFilteredRecipes } from '~/management/recipe/redux/recipeSelectors';
import { SortEnum } from '~/management/recipe/SortEnum';
import { appUrls } from '~/routing/appUrls';
import { RecipeStats } from './RecipeStats';
import { RecipeController } from './redux';
import classes from './RecipesPage.module.scss';

const sortTranslationKeys: {
  [sortValue in SortEnum]: string;
} = {
  [SortEnum.ByName]: 'recipe.sort.byName',
  [SortEnum.ByKcal]: 'recipe.sort.byKcal',
  [SortEnum.ByCookingTime]: 'recipe.sort.byCookingTime',
};

const RecipesPage = () => {
  const translation = useTranslation();
  const { t } = translation;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLocaleResource('recipe');

  const [searchString, setSearchString] = useState('');
  const [sortAscending, setSortAscending] = useState(true);

  const sortOptionsMap = useMemo(() => {
    const map = new Map<SortEnum, Option<SortEnum>>();

    for (const [sortValue, translationKey] of Object.entries(
      sortTranslationKeys
    ) as [SortEnum, string][]) {
      map.set(sortValue, {
        value: sortValue,
        label: t(translationKey),
      });
    }
    return map;
  }, [translation]);

  const sortOptions = useMemo<Option<SortEnum>[]>(
    () => Array.from(sortOptionsMap.values()),
    [sortOptionsMap]
  );

  const [selectedSort, setSelectedSort] = useState(
    () => sortOptionsMap.get(SortEnum.ByName)!
  );

  useEffect(() => {
    setSelectedSort(sortOptionsMap.get(selectedSort.value)!);
  }, [translation]);

  const [areFiltersOpen, setAreFiltersOpen] = useToggler();

  const recipes = useSelector((state) =>
    selectFilteredRecipes(state, {
      searchString,
      isAscendingSort: sortAscending,
      sortBy: selectedSort.value,
    })
  );

  useEffect(() => {
    dispatch(RecipeController.loadRecipes());
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.header}>
          <TextField
            label={t('recipe.search')}
            value={searchString}
            onChange={setSearchString}
            icon={<Icon variant={'search'} />}
            className={classes.searchField}
          />

          <IconButton
            className={classes.sortButton}
            onClick={() => {
              setSortAscending((state) => !state);
            }}
            title={
              (sortAscending
                ? t('recipe.sort.ascending')
                : t('recipe.sort.descending')) ?? ''
            }
          >
            <Icon variant={sortAscending ? 'sortUp' : 'sortDown'} />
          </IconButton>

          <SelectField
            className={classes.sortField}
            value={selectedSort}
            onChange={(newSortOption) => {
              if (newSortOption) {
                setSelectedSort(newSortOption);
              }
            }}
            options={sortOptions}
          />

          <IconButton
            onClick={setAreFiltersOpen.toggle}
            className={clsx(classes.filtersButton, {
              [classes.filtersButtonOpened]: areFiltersOpen,
              [classes.filtersButtonClosed]: !areFiltersOpen,
            })}
          >
            <Icon variant={'filter'} />
          </IconButton>
        </div>

        <div className={classes.recipes}>
          {recipes.map((recipe) => (
            <div key={recipe.id} className={classes.recipe}>
              <Typography className={classes.recipeName} size={18} bold>
                {recipe.name}
              </Typography>

              <Image
                className={classes.recipeImage}
                src={ImageApi.makeUrl(recipe.image_id)}
                onClick={() => {
                  navigate(
                    appUrls.management.recipe
                      .recipeId(recipe.id.toString())
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
                recipe={recipe}
              />
            </div>
          ))}
        </div>

        <Button
          className={classes.addButton}
          onClick={() => navigate(appUrls.management.recipe.add.url())}
        >
          {t('recipe.add')}
        </Button>
      </div>

      <Filters
        className={classes.filters}
        open={areFiltersOpen}
        onClose={setAreFiltersOpen.off}
      />
    </div>
  );
};

export { RecipesPage };
