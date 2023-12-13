import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useContext, useEffect, useMemo } from 'react';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from '../config/i18next/TranslationContext';
import { useLocaleResource } from '../config/i18next';
import { appUrlTranslationKey } from '../routing';
import {
  makeDocumentTitle,
  NavigationBarContext,
} from './NavigationBarContext';
import classes from './NavigationBar.module.scss';

// my/page/subpage
const URL_PARTS_SEPARATOR = '/';

type Breadcrumb = {
  name: string;
  url: string;
};

export const NavigationBar = () => {
  const translation = useTranslation();
  const { t } = translation;
  const location = useLocation();
  const { title, setTitle } = useContext(NavigationBarContext);

  useLocaleResource('navigation');

  useEffect(() => {
    setTitle(undefined);
  }, [location.pathname]);

  const breadcrumbs = useMemo<Breadcrumb[]>(() => {
    const urlParts = location.pathname
      .split(URL_PARTS_SEPARATOR)
      .filter(Boolean);
    if (!urlParts.length) {
      return [];
    }

    const breadcrumbs: Breadcrumb[] = [];

    const parts = urlParts.slice();
    let currentPart = parts.shift();
    let currentUrl = URL_PARTS_SEPARATOR + (currentPart ?? '');

    const urls = Array.from(appUrlTranslationKey.keys());

    while (currentPart) {
      let name = currentPart;

      // do not touch id
      if (isNaN(parseInt(currentPart, 10))) {
        const url = urls.find(
          (_url) =>
            matchPath(
              {
                path: _url,
                end: true,
              },
              currentUrl
            ) != null
        );
        if (url) {
          name = appUrlTranslationKey.get(url)!;
        }
      }

      breadcrumbs.push({
        name: name,
        url: currentUrl,
      });
      currentPart = parts.shift();
      currentUrl += URL_PARTS_SEPARATOR + currentPart;
    }

    return breadcrumbs;
  }, [location.pathname]);

  useEffect(() => {
    const last = breadcrumbs.at(-1);
    if (last) {
      document.title = makeDocumentTitle(t(last.name));
    }
  }, [breadcrumbs, translation]);

  return (
    <div className={classes.root}>
      <Breadcrumb>
        {breadcrumbs.map((breadcrumb, index) => {
          const isCurrentPage = index === breadcrumbs.length - 1;
          return (
            <BreadcrumbItem key={breadcrumb.url} isCurrentPage={isCurrentPage}>
              <BreadcrumbLink
                as={(props: { to: string }) => (
                  <NavLink {...props} to={breadcrumb.url} />
                )}
              >
                {isCurrentPage && title ? title : t(breadcrumb.name)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </div>
  );
};
