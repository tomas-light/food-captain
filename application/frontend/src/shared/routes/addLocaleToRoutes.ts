import type { NonIndexRouteObject } from 'react-router';
import { locales } from '../locale/Locale';

export function addLocaleToRoutes() {
  return function (...routeObjects: NonIndexRouteObject[]) {
    const routes: NonIndexRouteObject[] = [];

    for (const routeObject of routeObjects) {
      routes.push({
        path: '*',
        ...routeObject,
      });

      for (const locale of locales) {
        routes.push({
          path: `${locale}/*`,
          ...routeObject,
        });
      }
    }

    return routes;
  };
}
