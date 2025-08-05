import type { Recipe } from '~/entities/recipe';
import { useTranslation } from '~/shared/locale';
import { Button, Skeleton, Typography } from '~/shared/ui';
import { useRecipeLikeQuery } from '../api/useRecipeLikeQuery';
import { RecipeLikeIcon } from './RecipeLikeIcon';
import { useOnClick } from './useOnClick';

type Props = {
  className?: string;
  recipeId: Recipe['id'] | undefined;
};

export function LikeRecipeButton(props: Props) {
  const { className, recipeId } = props;

  const { t } = useTranslation('features/like-recipe', {
    keyPrefix: 'LikeRecipeButton',
  });

  const {
    data: existedLike,
    isLoading,
    isFetching,
  } = useRecipeLikeQuery({ recipeId });
  const onClick = useOnClick(recipeId);

  if (isLoading) {
    return <Skeleton height={40} width={100} />;
  }

  return (
    <Button
      variant="outline"
      elevated
      className={className}
      onClick={onClick}
      loading={isFetching}
      icon={<RecipeLikeIcon recipeId={recipeId} />}
    >
      <Typography>
        {existedLike?.status === undefined && t('like')}
        {existedLike?.status === 'like' && t('dislike')}
        {existedLike?.status === 'dislike' && t('unlike')}
      </Typography>
    </Button>
  );
}
