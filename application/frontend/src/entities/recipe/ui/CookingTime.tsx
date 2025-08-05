import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import { useTranslation } from '~/shared/locale';
import { Typography } from '~/shared/ui';
import type { Recipe } from '../model/Recipe';
import classes from './CookingTime.module.scss';

type Props = HTMLAttributes<HTMLDivElement> & {
  cookingTime: Recipe['cookingTimeInMinutes'];
};

export function CookingTime(props: Props) {
  const { cookingTime, className, ...htmlAttributes } = props;

  const { t } = useTranslation('entities/recipe', {
    keyPrefix: 'CookingTime',
  });

  return (
    <Typography
      className={clsx(classes.root, className, {
        [classes.notDefined]: cookingTime == null,
        [classes.fast]: cookingTime != null && cookingTime <= 30,
        [classes.medium]:
          cookingTime != null && cookingTime > 30 && cookingTime <= 60,
        [classes.long]: cookingTime != null && cookingTime > 60,
      })}
      size="small"
      weight="medium"
      {...htmlAttributes}
    >
      {t('time', { minutes: cookingTime })}
    </Typography>
  );
}
