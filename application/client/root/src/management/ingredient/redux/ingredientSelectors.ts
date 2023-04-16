import { createSelector } from '@reduxjs/toolkit';
import { State } from '~State';

export const selectIngredientsBySearchString = createSelector(
  (state: State) => state.ingredient.ingredients,
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
