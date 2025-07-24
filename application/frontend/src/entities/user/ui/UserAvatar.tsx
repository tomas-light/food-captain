import { Typography } from '~/shared/ui';
import { useMyUserQuery } from '../api/useMyUserQuery';

type Props = {};

export function UserAvatar(props: Props) {
  const {} = props;

  const { data: user, isLoading } = useMyUserQuery();

  if (isLoading) {
    return 'skeleton...';
  }

  if (!user) {
    return null;
  }

  return <Typography>{user.name}</Typography>;
}
