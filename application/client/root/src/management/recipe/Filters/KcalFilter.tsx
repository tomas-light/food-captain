import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, useToggler } from '@food-captain/client-shared';
import { useTranslation } from '~/config/i18next/TranslationContext';
import { useSelector } from '~/config/redux/useSelector';
import { RecipeFilters } from '~/models';
import { RecipeFiltersController } from '../redux/RecipeFilters.controller';
import classes from './KcalFilter.module.scss';

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

  const [showTooltip, setShowTooltip] = useToggler();

  if (!maxKcal) {
    return <Typography capitalize>{t('filters.kcal.noRecords')}</Typography>;
  }

  return (
    <div className={classes.root}>
      <Typography>{t('recipe.filters.kcal.remark')}</Typography>

      <Slider
        value={kcalLimit ?? maxKcal}
        min={0}
        max={maxKcal}
        onChange={onChange}
        onMouseEnter={setShowTooltip.on}
        onMouseLeave={setShowTooltip.off}
      >
        <SliderMark value={0} mt="1" ml="-2.5" fontSize="sm">
          0
        </SliderMark>
        <SliderMark value={maxKcal} mt="1" ml="-2.5" fontSize="sm">
          {maxKcal}
        </SliderMark>

        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>

        <Tooltip
          hasArrow
          // bg="teal.500"
          color="white"
          placement="bottom"
          isOpen={showTooltip}
          label={kcalLimit}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </div>
  );
};
