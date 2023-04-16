import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { theme } from '../../../theme';
import { ButtonState } from '../ButtonState';
import { ButtonWrapper, ButtonWrapperProps } from './ButtonWrapper';

type Props = PropsWithChildren<
  ButtonWrapperProps & {
    state?: ButtonState;
    onClick?: () => void;
    color?: keyof (typeof theme)['colors'];
  } & Pick<ButtonProps, 'size'>
>;

const Button = (props: Props) => {
  const {
    className,
    state = {},
    title,
    disabled,
    color = 'secondary',
    ...rest
  } = props;

  const _disabled =
    state.loading || state.disabled || state.pristine || disabled;

  return (
    <ButtonWrapper className={className} title={title} disabled={_disabled}>
      <ChakraButton
        aria-label={title}
        isLoading={state.loading}
        isDisabled={_disabled}
        colorScheme={color}
        {...rest}
      />
    </ButtonWrapper>
  );
};

export { Button };
