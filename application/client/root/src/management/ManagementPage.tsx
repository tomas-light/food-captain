import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@food-captain/client-shared';
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
        <Card key={url} labelKey={labelKey} url={url} />
      ))}
    </div>
  );
};

type CardProps = {
  labelKey: string;
  url: string;
};

const Card: FC<CardProps> = (props) => {
  const { labelKey, url } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={classes.cardRoot} onClick={() => navigate(url)}>
      <Typography size={18}>{t(labelKey)}</Typography>
    </div>
  );
};
