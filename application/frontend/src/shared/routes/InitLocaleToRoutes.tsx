import { type PropsWithChildren, useEffect } from 'react';
import { useLocation } from 'react-router';
import { locales } from '../locale/Locale';
import { routes } from './routes';

type Props = PropsWithChildren;

export function InitLocaleToRoutes(props: Props) {
  const { children } = props;
  const { pathname } = useLocation();

  useEffect(() => {
    const currentLocale = locales.find(
      (locale) =>
        pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
    );

    if (currentLocale == null) {
      routes.setBaseRoute('');
    } else {
      routes.setBaseRoute(currentLocale);
    }
  }, [pathname]);

  return children;
}
