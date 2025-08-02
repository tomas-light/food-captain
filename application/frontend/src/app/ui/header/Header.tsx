import { Desktop, Mobile } from '~/shared/ui';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';

type Props = {};

export function Header(props: Props) {
  const {} = props;

  return (
    <>
      <Mobile>
        <MobileHeader />
      </Mobile>

      <Desktop>
        <DesktopHeader />
      </Desktop>
    </>
  );
}
