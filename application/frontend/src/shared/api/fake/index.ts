import type { ApiClient } from '../ApiClient';

export const fakeApiLazyImports: {
  [key in keyof ApiClient]: () => Promise<Partial<ApiClient[key]>>;
} = {
  auth: async () => (await import('./fakeAuthApi')).fakeAuthApi,
  dimension: async () => (await import('./fakeDimensionApi')).fakeDimensionApi,
  image: async () => (await import('./fakeImageApi')).fakeImageApi,
  ingredient: async () =>
    (await import('./fakeIngredientApi')).fakeIngredientApi,
  menu: async () => (await import('./fakeMenuApi')).fakeMenuApi,
  recipe: async () => (await import('./fakeRecipeApi')).fakeRecipeApi,
  tag: async () => (await import('./fakeTagApi')).fakeTagApi,
  user: async () => (await import('./fakeUserApi')).fakeUserApi,
};
