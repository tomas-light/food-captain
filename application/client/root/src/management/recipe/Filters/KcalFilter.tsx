import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Slider, Typography } from '@food-captain/client-shared';
import { RecipeFiltersController } from '../redux/RecipeFilters.controller';
import { RecipeFilters } from '../../../models';
import { useTranslation } from '../../../config/i18next/TranslationContext';
import { useSelector } from '../../../config/redux/useSelector';
import classes from './SliderFilter.module.scss';

type Props = {
  kcalLimit: RecipeFilters['kcalLimit'];
  onChange: (kcalLimit: RecipeFilters['kcalLimit']) => void;
};

export const KcalFilter: FC<Props> = (props) => {
  const { kcalLimit, onChange } = props;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { maxKcal } = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(RecipeFiltersController.loadMaxKcal());
  }, []);

  if (!maxKcal) {
    return <Typography capitalize>{t('filters.kcal.noRecords')}</Typography>;
  }

  return (
    <div className={classes.root}>
      <Typography>{t('recipe.filters.kcal.remark')}</Typography>

      <Slider value={kcalLimit ?? maxKcal} max={maxKcal} onChange={onChange} />
    </div>
  );
};
