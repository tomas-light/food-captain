import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Slider, Typography } from '@food-captain/client-shared';
import { RecipeFiltersController } from '../redux/RecipeFilters.controller';
import { RecipeFilters } from '../../../models';
import { useTranslation } from '../../../config/i18next/TranslationContext';
import { useSelector } from '../../../config/redux/useSelector';
import classes from './SliderFilter.module.scss';

type Props = {
  cookingTimeLimit: RecipeFilters['cookingTimeLimit'];
  onChange: (kcalLimit: RecipeFilters['cookingTimeLimit']) => void;
};

export const CookingTimeFilter: FC<Props> = (props) => {
  const { cookingTimeLimit, onChange } = props;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { maxCookingTime } = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(RecipeFiltersController.loadMaxCookingTime());
  }, []);

  if (!maxCookingTime) {
    return (
      <Typography capitalize>{t('filters.cookingTime.noRecords')}</Typography>
    );
  }

  return (
    <div className={classes.root}>
      <Typography>{t('recipe.filters.cookingTime.remark')}</Typography>

      <Slider
        value={cookingTimeLimit ?? maxCookingTime}
        max={maxCookingTime}
        onChange={onChange}
      />
    </div>
  );
};
