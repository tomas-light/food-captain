import { Link } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useIngredientLocale } from '~/config/i18next';
import { appUrls } from '~/routing/appUrls';
import classes from './NavigationPanel.module.scss';

type NavigationElement = {
  url: string;
  label: string;
};

const NavigationPanel = () => {
  const { t } = useTranslation();
  useIngredientLocale();

  const [navigationElements] = useState<NavigationElement[]>([
    { url: appUrls.menu.url(), label: t('menu.many') },
    {
      url: appUrls.dish.url(),
      label: t('dish.many'),
    },
    {
      url: appUrls.ingredient.url(),
      label: t('ingredient.many'),
    },
  ]);

  return (
    <div className={classes.root}>
      {navigationElements.map((element) => (
        <Link
          as={(props: any) => (
            <NavLink
              {...props}
              className={({ isActive, isPending }) =>
                isActive ? 'my-active' : 'my-defult'
              }
            />
          )}
          key={element.url}
          to={element.url}
        >
          {element.label}
        </Link>
      ))}
    </div>
  );
};

export { NavigationPanel };
