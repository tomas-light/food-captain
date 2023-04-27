import { CloseButton } from '@chakra-ui/react';
import clsx from 'clsx';
import { FC, ReactElement, ReactNode } from 'react';
import {
  Button,
  IconButton,
  Typography,
  useScreenBreakpoints,
} from '@food-captain/client-shared';
import { useTranslation } from '~/config/i18next/TranslationContext';
import classes from './Filter.module.scss';

type Props = {
  selected: boolean;
  titleTranslationKey: string;
  titleBold?: true;
  children: ReactNode;
  icon?: ReactElement;
  onClear: () => void;
};

export const Filter: FC<Props> = (props) => {
  const { selected, titleBold, titleTranslationKey, children, icon, onClear } =
    props;

  const { t } = useTranslation();
  const screenBreakpoints = useScreenBreakpoints();

  return (
    <div
      className={clsx(classes.filter, {
        [classes.selectedFilter]: selected,
      })}
    >
      <div className={classes.filterTitle}>
        <Typography icon={icon} capitalize bold={titleBold}>
          {t(titleTranslationKey)}
        </Typography>

        {screenBreakpoints.more['1280'] ? (
          <Button
            color={'default'}
            variant={'ghost'}
            size={'sm'}
            onClick={onClear}
          >
            {t('recipe.filters.clear')}
          </Button>
        ) : (
          <CloseButton
            size={'sm'}
            title={t('recipe.filters.clear') ?? ''}
            onClick={onClear}
          />
        )}
      </div>

      {children}
    </div>
  );
};
