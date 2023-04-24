import { Link } from '@chakra-ui/react';
import clsx from 'clsx';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, IconVariant } from '@food-captain/client-shared';
import { useLocaleResource } from '~/config/i18next';
import { useTranslation } from '~/config/i18next/TranslationContext';
import { appUrls } from '~/routing/appUrls';
import classes from './NavigationPanel.module.scss';

type NavigationElement = {
  url: string;
  labelKey: string;
  icon: IconVariant;
};

const navigationElements: NavigationElement[] = [
  {
    url: appUrls.management.url(),
    labelKey: 'navigation.management',
    icon: 'steeringWheel',
  },
  {
    url: appUrls.randomizer.url(),
    labelKey: 'navigation.randomizer',
    icon: 'compass',
  },
];

export const NavigationPanel = () => {
  const { t } = useTranslation();
  const [playMeatBallSlap] = useState(() => {
    const audio = new Audio('/sounds/meatBall_slap.mp3');
    return () => {
      audio.play().catch(function (error) {
        if (error instanceof Error) {
          if (
            error.message.includes(
              "failed because the user didn't interact with the document first"
            )
          ) {
            // valid behaviour, no need to spam errors
            return;
          }
        }
        throw error;
      });
    };
  });

  useLocaleResource('navigation');

  return (
    <div className={classes.root}>
      <div className={classes.relativeContainerForMeatBall}>
        <Icon className={classes.logo} variant={'logo'} />

        {navigationElements.map((element) => (
          <Link
            as={(props: { to: string; children: string }) => (
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
                >
                  <Icon variant={element.icon} />
                  <span>{props.children}</span>
                </NavLink>
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
