import { Desktop, Laptop, Mobile } from '~/shared/ui';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';

export function Header() {
  return (
    <>
      <Mobile>
        <MobileHeader />
      </Mobile>

      <Laptop>
        <DesktopHeader />
      </Laptop>

      <Desktop>
        <DesktopHeader />
      </Desktop>
    </>
  );
}
