import { useNavigate, useParams } from 'react-router';
import { useRecipeByIdQuery } from '~/entities/recipe';
import { LikeRecipeButton } from '~/features/like-recipe';
import { useTranslation } from '~/shared/locale';
import { routes } from '~/shared/routes';
import { NavigationHeader, NotFound } from '~/shared/ui';

export function RecipeDetailsPage() {
  const { recipeId } = useParams();

  const navigate = useNavigate();

  const { t } = useTranslation('pages/recipe', {
    keyPrefix: 'RecipeDetailsPage',
  });

  const { data: recipe, isLoading } = useRecipeByIdQuery({
    recipeId: recipeId ? +recipeId : undefined,
  });

  if (!isLoading && !recipe) {
    return <NotFound>{t('notFound')}</NotFound>;
  }

  return (
    <div>
      <NavigationHeader
        back={{
          text: t('back'),
          onClick: () => navigate(routes.recipes.url()),
        }}
      >
        <LikeRecipeButton recipeId={recipe?.id} />
      </NavigationHeader>
    </div>
  );
}
