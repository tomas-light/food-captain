import { Desktop, Mobile } from '~/shared/ui';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileSidebar } from './MobileSidebar';

export function Sidebar() {
  return (
    <>
      <Mobile>
        <MobileSidebar />
      </Mobile>

      <Desktop>
        <DesktopSidebar />
      </Desktop>
    </>
  );
}
