import Markdown from 'react-markdown';
import { useTranslation } from '~/shared/locale';
import { Skeleton, Typography } from '~/shared/ui';
import { useRecipeByIdQuery } from '../api/useRecipeByIdQuery';
import type { Recipe } from '../model/Recipe';
import classes from './RecipeFormulaViewer.module.scss';

type Props = {
  recipeId: Recipe['id'] | undefined;
};

export function RecipeFormulaViewer(props: Props) {
  const { recipeId } = props;

  const { t } = useTranslation('entities/recipe', {
    keyPrefix: 'RecipeFormulaViewer',
  });

  const { data: recipe, isFetching } = useRecipeByIdQuery({ recipeId });

  if (isFetching) {
    return <Skeleton height={200} />;
  }

  if (!recipe) {
    return null;
  }

  return (
    <div className={classes.root}>
      <header>
        <Typography component="h2" size="xl" weight="semibold">
          {t('title')}
        </Typography>
      </header>

      <Markdown>{recipe.formula}</Markdown>
    </div>
  );
}
