import { Outlet, type RouteObject } from 'react-router';
import { AfterLoginRedirector } from '~/entities/user';
import { makeSuspendedElement, NavigateTo, routes } from '~/shared/routes';

export function createRecipesRoutes(): RouteObject[] {
  return [
    {
      path: routes.recipes.relativeUrl(),
      element: (
        <AfterLoginRedirector>
          {makeSuspendedElement(
            async () => (await import('../ui/RecipesPage')).RecipesPage,
            <Outlet />
          )}
        </AfterLoginRedirector>
      ),
    },
    {
      path: routes.recipes.recipeId().url(),
      children: [
        {
          index: true,
          element: (
            <NavigateTo
              to={(routeParams) =>
                routes.recipes.recipeId(routeParams.recipeId).details.url()
              }
            />
          ),
        },
        {
          path: routes.recipes.recipeId().details.relativeUrl(),
          element: makeSuspendedElement(
            async () =>
              (await import('../ui/RecipeDetailsPage')).RecipeDetailsPage
          ),
        },
      ],
    },
  ];
}
