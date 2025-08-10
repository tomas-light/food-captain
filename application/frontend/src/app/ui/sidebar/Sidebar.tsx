import { Desktop, Laptop, Mobile } from '~/shared/ui';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileSidebar } from './MobileSidebar';

export function Sidebar() {
  return (
    <>
      <Mobile>
        <MobileSidebar />
      </Mobile>

      <Laptop>
        <DesktopSidebar />
      </Laptop>

      <Desktop>
        <DesktopSidebar />
      </Desktop>
    </>
  );
}
