import { Skeleton } from '~/shared/ui';
import classes from './RecipeCardSkeleton.module.scss';

export function RecipeCardSkeleton() {
  return (
    <div className={classes.root}>
      <section className={classes.imageContainer}>
        <Skeleton />

        <Skeleton
          height={32}
          width={32}
          borderRadius="100%"
          className={classes.likeButton}
        />

        <Skeleton
          height={32}
          width={32}
          borderRadius="100%"
          className={classes.dislikeButton}
        />

        <Skeleton
          height={24}
          width={80}
          borderRadius="9999px"
          className={classes.cookingTime}
        />
      </section>

      <section className={classes.content}>
        <header className={classes.header}>
          <Skeleton
            height={20}
            width="75%"
            borderRadius="var(--radius-sm)"
            className={classes.title}
          />
          <Skeleton
            height={16}
            width="100%"
            borderRadius="var(--radius-sm)"
            className={classes.description}
          />
          <Skeleton
            height={16}
            width="85%"
            borderRadius="var(--radius-sm)"
            className={classes.description}
          />
        </header>

        <div className={classes.tags}>
          <Skeleton height={20} width={48} borderRadius="var(--radius-full)" />
          <Skeleton height={20} width={64} borderRadius="var(--radius-full)" />
        </div>
      </section>
    </div>
  );
}
