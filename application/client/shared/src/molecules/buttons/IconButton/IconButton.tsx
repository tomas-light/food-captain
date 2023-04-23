import {
  IconButton as ChakraIconButton,
  IconButtonProps,
} from '@chakra-ui/react';
import { ForwardedRef, forwardRef } from 'react';
import { Tooltip, TooltipProps } from '../../../atoms';
import { ButtonState } from '../ButtonState';

type Props = Partial<TooltipProps> &
  Pick<IconButtonProps, 'icon' | 'size' | 'onClick'> & {
    children?: IconButtonProps['icon'];
    state?: ButtonState;
    className?: string;
    color?: string;
  };

const IconButton = (props: Props, ref: ForwardedRef<HTMLButtonElement>) => {
  const {
    state = {},
    title = 'Icon button',
    color = 'default',
    icon,
    children,
    ...rest
  } = props;

  return (
    <Tooltip title={title}>
      <ChakraIconButton
        {...rest}
        colorScheme={color}
        ref={ref}
        icon={children ?? icon}
        variant={'outline'}
        aria-label={title}
        isDisabled={state.disabled}
        isLoading={state.loading}
      />
    </Tooltip>
  );
};

const componentWithRef = forwardRef(IconButton);
export { componentWithRef as IconButton };
