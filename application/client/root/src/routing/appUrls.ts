import { createObjectNiceWebRoutes } from 'nice-web-routes';

export const appUrls = createObjectNiceWebRoutes()({
  some: {},
  dish: {
    add: {},
    dishId: () => ({
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
});
