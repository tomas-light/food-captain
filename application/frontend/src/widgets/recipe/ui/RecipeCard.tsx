import type { Recipe } from '~/entities/recipe';
import { LikeRecipeIconButton } from '~/features/like-recipe';
import { Image } from '~/shared/ui';
import classes from './RecipeCard.module.scss';

type Props = {
  recipe: Recipe;
};

export function RecipeCard(props: Props) {
  const { recipe } = props;

  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <Image src={recipe.imageUrl} className={classes.image} />

        <LikeRecipeIconButton
          recipeId={recipe.id}
          className={classes.likeButton}
        />

        {/* Difficulty Badge */}
        {/* <div
          className={`${styles.difficultyBadge} ${getDifficultyClass(recipe.difficulty)}`}
        >
          {recipe.difficulty}
        </div>*/}
      </div>
    </div>
  );
}
