import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../../config/redux/index';

export const selectIngredients = createSelector(
  (state: State) => state.ingredient.ingredientsMap,
  (ingredientsMap) => {
    return Array.from(ingredientsMap.values());
  }
);

export const selectIngredientsBySearchString = createSelector(
  selectIngredients,
  (state: State, searchString: string) => searchString,
  (ingredients, searchString) => {
    searchString = searchString?.trim() ?? '';
    if (!searchString) {
      return ingredients;
    }
    searchString = searchString.toLocaleLowerCase();
    return ingredients.filter(
      (ingredient) =>
        ingredient.name?.toLocaleLowerCase().startsWith(searchString) ?? false
    );
  }
);
