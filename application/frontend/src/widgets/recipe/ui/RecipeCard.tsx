import { useNavigate } from 'react-router';
import { CookingTime, type Recipe } from '~/entities/recipe';
import { TagsBadges } from '~/entities/tag';
import { DislikeRecipeIconButton, LikeRecipeIconButton } from '~/features/like-recipe';
import { routes } from '~/shared/routes';
import { Image, Typography } from '~/shared/ui';
import classes from './RecipeCard.module.scss';

type Props = {
  recipe: Recipe;
};

export function RecipeCard(props: Props) {
  const { recipe } = props;

  const navigate = useNavigate();

  return (
    <div
      className={classes.root}
      onClick={() =>
        navigate(routes.recipes.recipeId(recipe.id.toString()).url())
      }
    >
      <section className={classes.imageContainer}>
        <Image src={recipe.imageUrl} className={classes.image} />

        <LikeRecipeIconButton
          recipeId={recipe.id}
          className={classes.likeButton}
        />
        <DislikeRecipeIconButton
          recipeId={recipe.id}
          className={classes.dislikeButton}
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

          <Typography
            component="p"
            size="small"
            className={classes.description}
          >
            {recipe.description}
          </Typography>
        </header>

        <TagsBadges tagIds={recipe.tagIds} />
      </section>
    </div>
  );
}
