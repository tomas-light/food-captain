import { Outlet, type RouteObject } from 'react-router';
import { makeSuspendedElement } from '~/shared/routes/index';
import { routes } from '~/shared/routes/routes';

export function createHomeRoutes(): RouteObject[] {
  return [
    {
      path: routes.home.relativeUrl(),
      element: makeSuspendedElement(
        async () => (await import('../ui/HomePage')).HomePage,
        <Outlet />
      ),
    },
  ];
}
