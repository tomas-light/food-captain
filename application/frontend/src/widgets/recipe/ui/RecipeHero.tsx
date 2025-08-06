import { type Recipe, useRecipeByIdQuery } from '~/entities/recipe';
import { TagsBadges } from '~/entities/tag';
import { useTranslation } from '~/shared/locale';
import { Image, NotFound, Skeleton, Typography } from '~/shared/ui';
import classes from './RecipeHero.module.scss';

type Props = {
  recipeId: Recipe['id'] | undefined;
};

export function RecipeHero(props: Props) {
  const { recipeId } = props;

  const { t } = useTranslation('widgets/recipe', {
    keyPrefix: 'RecipeHero',
  });

  const query = useRecipeByIdQuery({
    recipeId,
  });
  const { data: recipe, isFetching } = query;

  if (isFetching) {
    return <Skeleton height={560} />;
  }

  if (!recipe) {
    return <NotFound>{t('notFound')}</NotFound>;
  }

  return (
    <section className={classes.root}>
      <div className={classes.imageContainer}>
        <Image src={recipe.imageUrl} className={classes.image} />
      </div>

      <div className={classes.content}>
        <Typography component="h1" size="xxxl" weight="bold">
          {recipe.name}
        </Typography>

        <Typography component="p" size="large" color="var(--color-muted-text)">
          {recipe.description}
        </Typography>

        <TagsBadges tagIds={recipe.tagIds} />
      </div>
    </section>
  );
}
