import { Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

type Props = {
  size?: keyof typeof sizes;
  className?: string;
  bold?: true;
  capitalize?: true;
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
  const { children, className, size = 16, bold, capitalize } = props;

  return (
    <Text
      className={className}
      fontSize={sizes[size]}
      fontWeight={bold && '600'}
      autoCapitalize={'sentences'}
      textTransform={capitalize && 'capitalize'}
    >
      {children}
    </Text>
  );
};

export { Typography };
export type { Props as TypographyProps };
