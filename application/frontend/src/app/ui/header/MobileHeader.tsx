import { Menu } from 'lucide-react';
import { UserAvatar } from '~/entities/user';
import { SwitchThemeIconButton } from '~/features/switch-theme';
import { IconButton, LogoSvg, Typography } from '~/shared/ui';
import { toggleMobileSidebarExpanded } from '../../config/useMobileSidebarConfig';
import classes from './MobileHeader.module.scss';

export function MobileHeader() {
  return (
    <header className={classes.root}>
      <div className={classes.container}>
        <div className={classes.flex}>
          <IconButton onClick={toggleMobileSidebarExpanded}>
            <Menu />
          </IconButton>

          <div className={classes.logoFlex}>
            <LogoSvg />
            <Typography weight="bold">Food Captain</Typography>
          </div>
        </div>

        <div className={classes.flex}>
          <UserAvatar />
          <SwitchThemeIconButton />
        </div>
      </div>
    </header>
  );
}
