import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Icon, Typography } from '@food-captain/client-shared';
import { useLocaleResource } from '~/config/i18next';
import { appUrls } from '~/routing';
import classes from './ManagementPage.module.scss';

export const ManagementPage: FC = () => {
  const [cards] = useState<CardProps[]>([
    { url: appUrls.management.menu.url(), labelKey: 'menu.many' },
    {
      url: appUrls.management.dish.url(),
      labelKey: 'dish.many',
    },
    {
      url: appUrls.management.ingredient.url(),
      labelKey: 'ingredient.many',
    },
  ]);

  return (
    <div className={classes.root}>
      {cards.map(({ labelKey, url }) => (
        <PlatterCard key={url} labelKey={labelKey} url={url} />
      ))}
    </div>
  );
};

type CardProps = {
  labelKey: string;
  url: string;
};

const MacaroniCard: FC<CardProps> = (props) => {
  const { labelKey, url } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();

  useLocaleResource('ingredient');
  useLocaleResource('menu');
  useLocaleResource('dish');

  return (
    <div className={classes.cardRoot} onClick={() => navigate(url)}>
      <Typography size={18}>{t(labelKey)}</Typography>
    </div>
  );
};

const PlatterCard: FC<CardProps> = (props) => {
  const { labelKey, url } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();

  useLocaleResource('ingredient');
  useLocaleResource('menu');
  useLocaleResource('dish');

  return (
    <div className={classes.platterRoot} onClick={() => navigate(url)}>
      <Icon variant={'platter'} />
      <Typography size={18}>{t(labelKey)}</Typography>
      <hr />
    </div>
  );
};
