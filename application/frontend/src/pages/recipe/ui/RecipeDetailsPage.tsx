import { useNavigate, useParams } from 'react-router';
import { RecipeFormulaViewer, RecipeNutrition } from '~/entities/recipe';
import { DislikeRecipeButton, LikeRecipeButton } from '~/features/like-recipe';
import { useTranslation } from '~/shared/locale';
import { routes, useNumberParameter } from '~/shared/routes';
import { NavigationHeader } from '~/shared/ui';
import { RecipeHero } from '~/widgets/recipe';
import classes from './RecipeDetailsPage.module.scss';

export function RecipeDetailsPage() {
  const { recipeId } = useParams();
  const sanitizedRecipeId = useNumberParameter(recipeId);

  const navigate = useNavigate();

  const { t } = useTranslation('pages/recipe', {
    keyPrefix: 'RecipeDetailsPage',
  });

  return (
    <div className={classes.root}>
      <NavigationHeader
        back={{
          text: t('back'),
          onClick: () => navigate(routes.recipes.url()),
        }}
      >
        <LikeRecipeButton recipeId={sanitizedRecipeId} />
        <DislikeRecipeButton recipeId={sanitizedRecipeId} />
      </NavigationHeader>

      <RecipeHero recipeId={sanitizedRecipeId} />

      <section className={classes.contentGrid}>
        <div className={classes.flex}>
          <RecipeNutrition recipeId={sanitizedRecipeId} />
        </div>

        <RecipeFormulaViewer recipeId={sanitizedRecipeId} />
      </section>
    </div>
  );
}
