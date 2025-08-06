import { useRecipesQuery } from '~/entities/recipe';
import { useTranslation } from '~/shared/locale';
import { NotFound, Skeleton, Typography } from '~/shared/ui';
import { RecipeCard, RecipeCardSkeleton } from '~/widgets/recipe';
import classes from './RecipesPage.module.scss';

export function RecipesPage() {
  const { t } = useTranslation('pages/recipe', {
    keyPrefix: 'RecipesPage',
  });

  const { data: recipes, isLoading } = useRecipesQuery();

  const isEmpty = !isLoading && !recipes?.length;

  return (
    <div className={classes.root}>
      <header>
        <Typography
          component="h3"
          size="xxl"
          weight="bold"
          className={classes.title}
        >
          {t('title')}
        </Typography>

        {!isLoading && (
          <Typography component="p" color="var(--color-muted-text)">
            {t('subtitle', { count: recipes?.length })}
          </Typography>
        )}
        {isLoading && (
          <Skeleton height={20} width={200} borderRadius="var(--radius-sm)" />
        )}
      </header>

      {isEmpty ? (
        <NotFound>{t('notFound')}</NotFound>
      ) : (
        <div className={classes.recipesGrid}>
          {isLoading &&
            Array.from({ length: 5 }).map((_, index) => (
              <RecipeCardSkeleton key={index} />
            ))}

          {recipes?.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
