import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { NiceWebRoutesNode } from 'nice-web-routes';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import { appUrls } from '~/routing';
import classes from './NavigationBar.module.scss';

// my/page/subpage
const URL_PARTS_SEPARATOR = '/';

type Breadcrumb = {
  name: string;
  url: string;
};

export const NavigationBar = () => {
  const { t } = useTranslation();
  const location = useLocation();

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
    let urlsNode = appUrls[
      currentPart as keyof typeof appUrls
    ] as NiceWebRoutesNode<any, any>;

    while (currentPart && urlsNode) {
      breadcrumbs.push({
        name: currentPart,
        url: urlsNode.url(),
      });
      currentPart = parts.shift();
      urlsNode = urlsNode[
        currentPart as keyof typeof appUrls
      ] as NiceWebRoutesNode<any, any>;
    }

    return breadcrumbs;
  }, [location.pathname]);

  return (
    <div className={classes.root}>
      <Breadcrumb>
        {breadcrumbs.map((breadcrumb, index) => (
          <BreadcrumbItem
            key={breadcrumb.url}
            isCurrentPage={index === breadcrumbs.length - 1}
          >
            <BreadcrumbLink
              as={(props: { to: string }) => (
                <NavLink {...props} to={breadcrumb.url} />
              )}
            >
              {breadcrumb.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </div>
  );
};
