import { createNiceWebRoutes } from 'nice-web-routes';

export const routes = createNiceWebRoutes({
  recipes: {
    recipeId: () => ({
      details: {},
    }),
  },
  login: {},
});
