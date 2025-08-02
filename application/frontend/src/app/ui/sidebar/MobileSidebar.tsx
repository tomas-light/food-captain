import { useIsMobileSidebarExpanded } from '../../config/useMobileSidebarConfig';

type Props = {};

export function MobileSidebar(props: Props) {
  const {} = props;

  const expanded = useIsMobileSidebarExpanded();

  if (!expanded) {
    return null;
  }

  return <aside>sidebar</aside>;
}
