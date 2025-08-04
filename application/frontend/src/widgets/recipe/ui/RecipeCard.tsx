import { CookingTime, type Recipe } from '~/entities/recipe';
import { TagsBadges } from '~/entities/tag';
import { LikeRecipeIconButton } from '~/features/like-recipe';
import { Image, Typography } from '~/shared/ui';
import classes from './RecipeCard.module.scss';

type Props = {
  recipe: Recipe;
};

export function RecipeCard(props: Props) {
  const { recipe } = props;

  return (
    <div className={classes.root}>
      <section className={classes.imageContainer}>
        <Image src={recipe.imageUrl} className={classes.image} />

        <LikeRecipeIconButton
          recipeId={recipe.id}
          className={classes.likeButton}
        />

        <CookingTime
          cookingTime={recipe.cookingTimeInMinutes}
          className={classes.cookingTime}
        />
      </section>

      <section className={classes.content}>
        <header className={classes.header}>
          <Typography
            component="h3"
            weight="semibold"
            className={classes.title}
          >
            {recipe.name}
          </Typography>

          <Typography component="p" size="sm" className={classes.description}>
            {recipe.description}
          </Typography>
        </header>

        <TagsBadges tagIds={recipe.tagIds} />
      </section>
    </div>
  );
}
