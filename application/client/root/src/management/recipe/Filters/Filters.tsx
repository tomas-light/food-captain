import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Typography,
  useScreenBreakpoints,
} from '@food-captain/client-shared';
import { RecipeFiltersController } from '../redux/RecipeFilters.controller';
import { useTranslation } from '../../../config/i18next/TranslationContext';
import { useSelector } from '../../../config/redux/useSelector';
import { FiltersBlocks } from './FiltersBlocks';
import classes from './Filters.module.scss';

type Props = {
  className?: string;
  open: boolean;
  onClose: () => void;
};

const Filters: FC<Props> = (props) => {
  const { className, open, onClose } = props;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const screenBreakpoints = useScreenBreakpoints();

  const { filters } = useSelector((state) => state.recipe);

  const [stateFilters, setStateFilters] = useState(filters);

  useEffect(() => {
    if (filters !== stateFilters) {
      setStateFilters(filters);
    }
  }, [filters]);

  const onCancel = () => {
    setStateFilters(filters);
    onClose();
  };

  const onApply = () => {
    dispatch(
      RecipeFiltersController.loadRecipesByFilters({
        filters: stateFilters,
      }).addNextActions(() => onClose())
    );
  };

  if (screenBreakpoints.more['1280']) {
    return (
      <div
        className={clsx(classes.root, className, {
          [classes.opened]: open,
          [classes.closed]: !open,
        })}
      >
        <div className={classes.layout}>
          <div className={classes.title}>
            <Typography capitalize>{t('recipe.filters.title')}</Typography>

            <Button
              className={clsx({
                [classes.hidden]: Object.keys(stateFilters).length === 0,
              })}
              color={'default'}
              variant={'ghost'}
              size={'sm'}
              onClick={() => {
                setStateFilters(() => ({}));
              }}
            >
              {t('recipe.filters.clear')}
            </Button>
          </div>

          <FiltersBlocks filters={stateFilters} setFilters={setStateFilters} />

          <div className={classes.buttons}>
            <Button variant={'ghost'} color={'default'} onClick={onCancel}>
              {t('recipe.filters.cancel')}
            </Button>

            <Button variant={'outline'} onClick={onApply}>
              {t('recipe.filters.apply')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Drawer
      isOpen={open}
      placement="right"
      onClose={onClose}
      size={screenBreakpoints.more['768'] ? 'md' : 'full'}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader className={classes.title}>
          <Typography capitalize>{t('recipe.filters.title')}</Typography>

          <Button
            className={clsx({
              [classes.hidden]: Object.keys(stateFilters).length === 0,
            })}
            color={'default'}
            variant={'ghost'}
            size={'sm'}
            onClick={() => {
              setStateFilters(() => ({}));
            }}
          >
            {t('recipe.filters.clear')}
          </Button>
        </DrawerHeader>

        <DrawerBody>
          <FiltersBlocks filters={stateFilters} setFilters={setStateFilters} />
        </DrawerBody>

        <DrawerFooter>
          <Button variant={'ghost'} color={'default'} onClick={onCancel}>
            {t('recipe.filters.cancel')}
          </Button>

          <Button variant={'outline'} onClick={onApply}>
            {t('recipe.filters.apply')}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export { Filters };
export type { Props as FiltersProps };
