import { UserAvatar } from '~/entities/user';
import { SwitchThemeIconButton } from '~/features/switch-theme';
import { LogoSvg, Typography } from '~/shared/ui';
import classes from './DesktopHeader.module.scss';

export function DesktopHeader() {
  return (
    <header className={classes.root}>
      <div className={classes.container}>
        <div className={classes.logoFlex}>
          <LogoSvg />
          <Typography weight="bold">Food Captain</Typography>
        </div>

        <div className={classes.flex}>
          <UserAvatar />
          <SwitchThemeIconButton />
        </div>
      </div>
    </header>
  );
}
