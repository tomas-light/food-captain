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

export const NavigationPanel = () => {
  const { t } = useTranslation();
  const [playMeatBallSlap] = useState(() => {
    const audio = new Audio('/sounds/meatBall_slap.mp3');
    return () => {
      audio.play();
    };
  });

  useLocaleResource('navigation');

  const [navigationElements] = useState<NavigationElement[]>([
    { url: appUrls.management.url(), labelKey: 'navigation.management' },
    {
      url: appUrls.randomizer.url(),
      labelKey: 'navigation.randomizer',
    },
  ]);

  return (
    <div className={classes.root}>
      <div className={classes.relativeContainerForMeatBall}>
        <Icon className={classes.logo} variant={'logo'} />

        {navigationElements.map((element) => (
          <Link
            as={(props: { to: string }) => (
              <div
                className={classes.linkContainer}
                ref={(div) => {
                  if (div) {
                    div.addEventListener(
                      'animationend',
                      playMeatBallSlap,
                      false
                    );
                  }
                }}
              >
                <NavLink
                  {...props}
                  className={({ isActive, isPending }) =>
                    clsx(classes.link, {
                      [classes.inactive]: !isActive,
                      [classes.active]: isActive,
                    })
                  }
                />
                <div className={classes.meatBall}></div>
              </div>
            )}
            key={element.labelKey}
            to={element.url}
          >
            {t(element.labelKey)}
          </Link>
        ))}
      </div>
    </div>
  );
};
