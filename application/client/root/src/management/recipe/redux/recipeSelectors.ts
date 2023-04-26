import { createSelector } from '@reduxjs/toolkit';
import { SortEnum } from '~/management/recipe/SortEnum';
import { Recipe } from '~/models';
import { State } from '~State';

const sortValueToPropertyMap = {
  [SortEnum.ByName]: 'name',
  [SortEnum.ByKcal]: 'kcal',
  [SortEnum.ByCookingTime]: 'cooking_time_in_minutes',
} satisfies {
  [sortValue in SortEnum]: keyof Recipe;
};

export const selectFilteredRecipes = createSelector(
  (state: State) => state.recipe.filteredRecipesMap,
  (state: State) => state.recipe.filters,
  (
    state: State,
    params: { searchString: string; isAscendingSort: boolean; sortBy: SortEnum }
  ) => params,
  (filteredRecipesMap, filters, { searchString, isAscendingSort, sortBy }) => {
    let recipes: Recipe[] = Array.from(filteredRecipesMap.values());

    searchString = searchString.trim().toLocaleLowerCase();

    const {
      cookingTimeLimit,
      excludedIngredientIds,
      includedIngredientIds,
      kcalLimit,
      tagIds,
    } = filters;

    const tagIdsSet = tagIds ? new Set(tagIds) : undefined;
    const includedIngredientIdsSet = includedIngredientIds
      ? new Set(includedIngredientIds)
      : undefined;
    const excludedIngredientIdsSet = excludedIngredientIds
      ? new Set(excludedIngredientIds)
      : undefined;

    recipes = recipes.filter((recipe) => {
      if (searchString) {
        const name = recipe.name?.trim().toLocaleLowerCase();
        if (name && !name.includes(searchString)) {
          return false;
        }
      }

      if (tagIdsSet) {
        if (
          !recipe.tags.length ||
          recipe.tags.every(({ tag_id }) => !tagIdsSet.has(tag_id))
        ) {
          return false;
        }
      }

      if (includedIngredientIdsSet) {
        if (
          !recipe.ingredients.length ||
          recipe.ingredients.every(
            ({ ingredient_id }) => !includedIngredientIdsSet.has(ingredient_id)
          )
        ) {
          return false;
        }
      }

      if (excludedIngredientIdsSet) {
        if (
          recipe.ingredients.length &&
          recipe.ingredients.some(({ ingredient_id }) =>
            excludedIngredientIdsSet.has(ingredient_id)
          )
        ) {
          return false;
        }
      }

      if (kcalLimit != null) {
        if (recipe.kcal == null || recipe.kcal > kcalLimit) {
          return false;
        }
      }

      if (cookingTimeLimit != null) {
        if (
          recipe.cooking_time_in_minutes == null ||
          recipe.cooking_time_in_minutes > cookingTimeLimit
        ) {
          return false;
        }
      }

      return true;
    });

    const sortedProperty = sortValueToPropertyMap[sortBy];
    recipes.sort((left, right) => {
      const leftValue = left[sortedProperty];
      const rightValue = right[sortedProperty];

      if (leftValue == null) {
        if (rightValue == null) {
          return 0;
        }
        return 1; // ever place undefined values at the end
      }
      if (rightValue == null) {
        return -1; // ever place undefined values at the end
      }

      if (leftValue < rightValue) {
        if (isAscendingSort) {
          return -1;
        } else {
          return 1;
        }
      }

      if (leftValue > rightValue) {
        if (isAscendingSort) {
          return 1;
        } else {
          return -1;
        }
      }

      return 0;
    });

    return recipes;
  }
);
