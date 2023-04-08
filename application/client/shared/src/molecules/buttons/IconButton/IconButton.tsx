import { ReactElement } from 'react';
import { IconButton as ChakraIconButton } from '@chakra-ui/react';
import { ButtonState } from '../ButtonState';
import { Tooltip, TooltipProps } from '../../../atoms';

type Props = Partial<TooltipProps> & {
  icon: ReactElement;
  state?: ButtonState;
  onClick?: () => void;
};

const IconButton = (props: Props) => {
  const { icon, state = {}, title = 'Icon button' } = props;

  return (
    <Tooltip title={title}>
      <ChakraIconButton
        aria-label={title}
        icon={icon}
        disabled={state.disabled}
        isLoading={state.loading}
      />
    </Tooltip>
  );
};

export { IconButton };
