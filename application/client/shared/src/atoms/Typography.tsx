import { Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

type Props = {
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
};

const sizes = {
  20: 'xl',
  18: 'lg',
  16: 'md',
  14: 'sm',
  12: 'xs',
};

const Typography: FC<Props> = (props) => {
  const { children, className, size = 16 } = props;

  return (
    <Text className={className} fontSize={sizes[size]}>
      {children}
    </Text>
  );
};

export { Typography };
export type { Props as TypographyProps };
