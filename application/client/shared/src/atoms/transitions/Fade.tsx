import { ScaleFade } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

type Props = {
  isOpen: boolean;
  children: ReactNode;
};

const Fade: FC<Props> = (props) => {
  const { isOpen, children } = props;

  return (
    <ScaleFade initialScale={0.9} in={isOpen}>
      {children}
    </ScaleFade>
  );
};

export { Fade };
export type { Props as FadeProps };
