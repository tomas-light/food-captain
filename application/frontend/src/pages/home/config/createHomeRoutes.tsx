import { Outlet, type RouteObject } from 'react-router';
import { AfterLoginRedirector } from '~/entities/auth';
import { makeSuspendedElement, routes } from '~/shared/routes';

export function createHomeRoutes(): RouteObject[] {
  return [
    {
      path: routes.home.relativeUrl(),
      element: (
        <AfterLoginRedirector>
          {makeSuspendedElement(
            async () => (await import('../ui/HomePage')).HomePage,
            <Outlet />
          )}
        </AfterLoginRedirector>
      ),
    },
  ];
}
