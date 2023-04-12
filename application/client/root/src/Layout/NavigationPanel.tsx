import { Link } from '@chakra-ui/react';
import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Icon } from '@food-captain/client-shared';
import { useLocaleResource } from '~/config/i18next';
import { appUrls } from '~/routing/appUrls';
import classes from './NavigationPanel.module.scss';

type NavigationElement = {
  url: string;
  labelKey: string;
};

const NavigationPanel = () => {
  const { t } = useTranslation();

  // todo: optimize?
  useLocaleResource('buttons');
  useLocaleResource('common');
  useLocaleResource('ingredient');
  useLocaleResource('menu');
  useLocaleResource('dish');

  const [navigationElements] = useState<NavigationElement[]>([
    { url: appUrls.menu.url(), labelKey: 'menu.many' },
    {
      url: appUrls.dish.url(),
      labelKey: 'dish.many',
    },
    {
      url: appUrls.ingredient.url(),
      labelKey: 'ingredient.many',
    },
  ]);

  return (
    <div className={classes.root}>
      <Icon className={classes.logo} variant={'logo'} />

      {navigationElements.map((element) => (
        <Link
          as={(props: { to: string }) => (
            <NavLink
              {...props}
              className={({ isActive, isPending }) =>
                clsx(classes.link, {
                  [classes.inactive]: !isActive,
                  [classes.active]: isActive,
                })
              }
            />
          )}
          key={element.labelKey}
          to={element.url}
        >
          {t(element.labelKey)}
        </Link>
      ))}
    </div>
  );
};

export { NavigationPanel };
