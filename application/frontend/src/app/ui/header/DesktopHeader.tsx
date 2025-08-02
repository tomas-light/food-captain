import { UserAvatar } from '~/entities/user';

type Props = {
};

export function DesktopHeader(props: Props) {
  const {} = props;

  return (
    <header>
      <nav></nav>

      <UserAvatar />
    </header>
  );
}
