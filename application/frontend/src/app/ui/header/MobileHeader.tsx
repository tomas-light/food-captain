import { Menu } from 'lucide-react';
import { UserAvatar } from '~/entities/user';
import { IconButton, LogoSvg, Typography } from '~/shared/ui';
import { toggleMobileSidebarExpanded } from '../../config/useMobileSidebarConfig';
import classes from './MobileHeader.module.scss';

type Props = {};

export function MobileHeader(props: Props) {
  const {} = props;

  return (
    <header className={classes.root}>
      <div className={classes.container}>
        <div className={classes.leftFlex}>
          <IconButton onClick={toggleMobileSidebarExpanded}>
            <Menu />
          </IconButton>

          <div className={classes.logoFlex}>
            <LogoSvg />
            <Typography weight="bold">Food Captain</Typography>
          </div>
        </div>

        <UserAvatar />
      </div>
    </header>
  );
}
