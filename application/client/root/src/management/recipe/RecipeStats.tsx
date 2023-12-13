import { Badge } from '@chakra-ui/react';
import clsx from 'clsx';
import { FC, useMemo } from 'react';
import { RecipeDto, RecipeTagDto } from '@food-captain/api';
import { Icon, Typography } from '@food-captain/client-shared';
import { useTranslation } from '../../config/i18next/TranslationContext';
import { useSelector } from '../../config/redux/useSelector';
import { colorSchemesMap } from './constants';
import classes from './RecipeStats.module.scss';

type Props = {
  classes?: Partial<{
    root: string;
    kcal: string;
    tags: string;
  }>;
  recipe: Pick<
    RecipeDto,
    'kcal' | 'cooking_time_in_minutes' | 'portion_weight_in_grams'
  > & {
    tags: RecipeTagDto[];
  };
};

export const RecipeStats: FC<Props> = (props) => {
  const { classes: propsClasses = {}, recipe } = props;
  const { t } = useTranslation();
  const { tagsMap } = useSelector((state) => state.recipe);

  const time = useMemo(
    () => timeBreakPoints(recipe.cooking_time_in_minutes),
    [recipe.cooking_time_in_minutes]
  );

  return (
    <div className={clsx(classes.root, propsClasses.root)}>
      <div className={clsx(classes.kcal, propsClasses.kcal)}>
        <Icon variant={'fire'} />
        <Typography>
          {t('recipe.view.kcal', { kcal: recipe.kcal ?? '-' })}
        </Typography>

        <Icon
          variant={'timer'}
          className={clsx({
            [classes.timerGray]: time.isNotDefined,
            [classes.timerGreen]: time.isFast,
            [classes.timerOrange]: time.isNotForLong,
            [classes.timerRed]: time.isLong,
          })}
        />
        <Typography>
          {t('recipe.view.minutes', {
            minutes: recipe.cooking_time_in_minutes ?? '-',
          })}
        </Typography>
      </div>

      <div className={clsx(classes.tags, propsClasses.tags)}>
        {recipe.tags.map(({ tag_id }) => {
          const tag = tagsMap.get(tag_id);
          const colorScheme = colorSchemesMap.get(tag?.color);
          return (
            <Badge
              key={tag_id}
              variant={'subtle'}
              colorScheme={colorScheme}
              as={'div'}
            >
              {tag?.name}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

const timeBreakPoints = (
  cookingTime: RecipeDto['cooking_time_in_minutes']
) => ({
  isNotDefined: cookingTime == null,
  isFast: cookingTime != null && cookingTime <= 30,
  isNotForLong: cookingTime != null && cookingTime > 30 && cookingTime <= 60,
  isLong: cookingTime != null && cookingTime > 60,
});
