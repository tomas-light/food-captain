import { Outlet, type RouteObject } from 'react-router';
import { AfterLoginRedirector } from '~/entities/user';
import { makeSuspendedElement, routes } from '~/shared/routes';

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
  ];
}
