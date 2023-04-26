import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import { Button, Typography } from '@food-captain/client-shared';
import { useTranslation } from '~/config/i18next/TranslationContext';
import classes from './Filter.module.scss';

type Props = {
  selected: boolean;
  titleTranslationKey: string;
  children: ReactNode;
  onClear: () => void;
};

export const Filter: FC<Props> = (props) => {
  const { selected, titleTranslationKey, children, onClear } = props;

  const { t } = useTranslation();

  return (
    <div
      className={clsx(classes.filter, {
        [classes.selectedFilter]: selected,
      })}
    >
      <div className={classes.filterTitle}>
        <Typography capitalize>{t(titleTranslationKey)}</Typography>

        <Button
          color={'default'}
          variant={'ghost'}
          size={'sm'}
          onClick={onClear}
        >
          {t('recipe.filters.clear')}
        </Button>
      </div>

      {children}
    </div>
  );
};
