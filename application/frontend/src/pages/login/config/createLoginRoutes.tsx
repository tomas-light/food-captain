import { Outlet, type RouteObject } from 'react-router';
import { makeSuspendedElement, routes } from '~/shared/routes';

export function createLoginRoutes(): RouteObject[] {
  return [
    {
      path: routes.login.relativeUrl(),
      element: makeSuspendedElement(
        async () => (await import('../ui/LoginPage')).LoginPage,
        <Outlet />
      ),
    },
  ];
}
