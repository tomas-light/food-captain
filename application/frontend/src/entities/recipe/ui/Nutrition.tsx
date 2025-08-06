import { useTranslation } from '~/shared/locale';
import { Typography } from '~/shared/ui';
import type { DishNutrition } from '../model/DishNutrition';
import classes from './Nutrition.module.scss';

type Props = {
  nutrition: Partial<DishNutrition>;
};

export function Nutrition(props: Props) {
  const { nutrition } = props;

  const { t } = useTranslation('entities/recipe', {
    keyPrefix: 'Nutrition',
  });

  function makeCardItem(
    key: keyof DishNutrition,
    options?: { withGrams: boolean }
  ) {
    const { withGrams = false } = options ?? {};

    const value = nutrition[key];
    return value
      ? {
          label: t(key, { count: Math.trunc(value) }),
          value: withGrams ? t('gram', { count: value }) : value,
        }
      : {
          label: t(key, { count: 0 }),
          value: 0,
        };
  }

  return (
    <section className={classes.root}>
      <header>
        <Typography component="h2" size="xl" weight="semibold">
          {t('title')}
        </Typography>

        <Typography
          size="small"
          weight="medium"
          color="var(--color-muted-text)"
        >
          {t('perServing')}
        </Typography>
      </header>

      <div className={classes.grid}>
        {[
          makeCardItem('calories'),
          makeCardItem('protein', { withGrams: true }),
          makeCardItem('carbs', { withGrams: true }),
          makeCardItem('fat', { withGrams: true }),
        ].map(({ label, value }) => (
          <div key={label} className={classes.nutritionCard}>
            <Typography
              size="xl"
              weight="bold"
              color="var(--color-primary)"
              className={classes.nutritionValue}
            >
              {value ?? '❓'}
            </Typography>

            <Typography
              size="small"
              weight="medium"
              color="var(--color-muted-text)"
            >
              {label}
            </Typography>
          </div>
        ))}
      </div>
    </section>
  );
}
