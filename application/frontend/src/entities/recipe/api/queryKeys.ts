import type { Recipe } from '../model/Recipe';

export function getRecipesQueryKey() {
  return ['recipes'];
}

export function getRecipeByIdQueryKey(recipeId: Recipe['id'] | undefined) {
  return ['recipes', recipeId];
}
