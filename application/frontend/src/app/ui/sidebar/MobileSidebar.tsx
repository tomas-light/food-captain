import { useIsMobileSidebarExpanded } from '../../config/useMobileSidebarConfig';
import classes from './MobileSidebar.module.scss';

export function MobileSidebar() {
  const expanded = useIsMobileSidebarExpanded();

  if (!expanded) {
    return null;
  }

  return <aside className={classes.root}>sidebar</aside>;
}
