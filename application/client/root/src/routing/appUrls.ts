import { createObjectNiceWebRoutes } from 'nice-web-routes';

export const appUrls = createObjectNiceWebRoutes()({
  management: {
    recipe: {
      add: {},
      recipeId: () => ({
        edit: {},
      }),
    },
    ingredient: {
      add: {},
      ingredientId: () => ({
        edit: {},
      }),
    },
    menu: {
      menuId: () => ({}),
    },
    schedule: {},
    user: {},
  },
  randomizer: {},
});
