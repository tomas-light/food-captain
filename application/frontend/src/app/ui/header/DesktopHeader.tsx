import { UserAvatar } from '~/entities/user';
import { LogoSvg, Typography } from '~/shared/ui';
import classes from './DesktopHeader.module.scss';

type Props = {};

export function DesktopHeader(props: Props) {
  const {} = props;

  return (
    <header className={classes.root}>
      <div className={classes.container}>
        <div className={classes.logoFlex}>
          <LogoSvg />
          <Typography weight="bold">Food Captain</Typography>
        </div>

        <UserAvatar />
      </div>
    </header>
  );
}
