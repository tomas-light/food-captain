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
  },
  randomizer: {},
});

export const appUrlTranslationKey = new Map<string, string>([
  [appUrls.management.url(), 'navigation.management'],
  [appUrls.management.recipe.url(), 'navigation.management_recipe'],
  [
    appUrls.management.recipe.recipeId().url(),
    'navigation.management_recipe_view',
  ],
  [
    appUrls.management.recipe.recipeId().edit.url(),
    'navigation.management_recipe_edit',
  ],
  [appUrls.management.recipe.add.url(), 'navigation.management_recipe_add'],

  [appUrls.management.ingredient.url(), 'navigation.management_ingredient'],
  [
    appUrls.management.ingredient.ingredientId().url(),
    'navigation.management_ingredient_view',
  ],
  [
    appUrls.management.ingredient.ingredientId().edit.url(),
    'navigation.management_ingredient_edit',
  ],
  [
    appUrls.management.ingredient.add.url(),
    'navigation.management_ingredient_add',
  ],

  [appUrls.randomizer.url(), 'navigation.randomizer'],
]);
