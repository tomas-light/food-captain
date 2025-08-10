import type { QueryClient } from '@tanstack/react-query';
import type { Recipe } from '../model/Recipe';

export function getRecipesQueryKey() {
  return ['recipes'];
}

export function invalidateRecipesQuery(queryClient: QueryClient) {
  return queryClient.invalidateQueries({
    queryKey: getRecipesQueryKey()
  })
}

export function getRecipeByIdQueryKey(recipeId: Recipe['id'] | undefined) {
  return ['recipes', recipeId];
}
