import { Typography } from '~/shared/ui';
import { useTagsByIdsQuery } from '../api/useTagsByIdsQuery';
import type { Tag } from '../model/Tag';
import classes from './TagsBadges.module.scss';

type Props = {
  tagIds: Tag['id'][];
};

export function TagsBadges(props: Props) {
  const { tagIds } = props;

  const { data: tags } = useTagsByIdsQuery({ tagIds });

  return (
    <div className={classes.root}>
      {tags?.slice(0, 3).map((tag, index) => (
        <Typography
          size="small"
          weight="medium"
          key={index}
          className={classes.tag}
        >
          {tag.name}
        </Typography>
      ))}
    </div>
  );
}
