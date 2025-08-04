import { useRecipesQuery } from '~/entities/recipe';
import { useTranslation } from '~/shared/locale';
import { NotFound, Skeleton } from '~/shared/ui';
import { RecipeCard } from '~/widgets/recipe';
import classes from './RecipesPage.module.scss';

export function RecipesPage() {
  const { t } = useTranslation('pages/recipe', {
    keyPrefix: 'RecipesPage',
  });

  const { data: recipes, isLoading } = useRecipesQuery();

  const isEmpty = !isLoading && !recipes?.length;

  return (
    <div>
      <p>{t('title')}</p>

      {isEmpty ? (
        <NotFound>{t('notFound')}</NotFound>
      ) : (
        <div className={classes.cardContainer}>
          {isLoading && <Skeleton />}

          {recipes?.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
