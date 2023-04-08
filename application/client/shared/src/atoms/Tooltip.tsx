import { Tooltip as ChakraTooltip } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
};

const Tooltip: FC<Props> = (props) => {
  const { title, children } = props;

  return <ChakraTooltip label={<p>{title}</p>}>{children}</ChakraTooltip>;
};

export { Tooltip };
export type { Props as TooltipProps };
