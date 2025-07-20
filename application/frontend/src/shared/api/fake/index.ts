import type { ApiClient } from '../ApiClient';

export const fakeApiLazyImports: {
  [key in keyof ApiClient]: () => Promise<Partial<ApiClient[key]>>;
} = {
  auth: async () => (await import('./fakeAuthApiClient')).fakeAuthApiClient,
  dimension: async () =>
    (await import('./fakeDimensionApiClient')).fakeDimensionApiClient,
  image: async () => (await import('./fakeImageApiClient')).fakeImageApiClient,
  ingredient: async () =>
    (await import('./fakeIngredientApiClient')).fakeIngredientApiClient,
  menu: async () => (await import('./fakeMenuApiClient')).fakeMenuApiClient,
  recipe: async () =>
    (await import('./fakeRecipeApiClient')).fakeRecipeApiClient,
  tag: async () => (await import('./fakeTagApiClient')).fakeTagApiClient,
  user: async () => (await import('./fakeUserApiClient')).fakeUserApiClient,
};
