import { ReactElement } from 'react';
import {
  IconButton as ChakraIconButton,
  IconButtonProps,
} from '@chakra-ui/react';
import { ButtonState } from '../ButtonState';
import { Tooltip, TooltipProps } from '../../../atoms';

type Props = Partial<TooltipProps> &
  Pick<IconButtonProps, 'size'> & {
    icon: ReactElement;
    state?: ButtonState;
    onClick?: () => void;
    className?: string;
  };

const IconButton = (props: Props) => {
  const { state = {}, title = 'Icon button', ...rest } = props;

  return (
    <Tooltip title={title}>
      <ChakraIconButton
        {...rest}
        variant={'outline'}
        aria-label={title}
        disabled={state.disabled}
        isLoading={state.loading}
      />
    </Tooltip>
  );
};

export { IconButton };
