import { Button as ChakraButton } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { ButtonState } from '../ButtonState';
import { ButtonWrapper, ButtonWrapperProps } from './ButtonWrapper';

type Props = PropsWithChildren<
  ButtonWrapperProps & {
    state?: ButtonState;
    onClick?: () => void;
  }
>;

const Button = (props: Props) => {
  const { state = {}, title, disabled, ...rest } = props;

  const _disabled =
    state.loading || state.disabled || state.pristine || disabled;

  return (
    <ButtonWrapper title={title} disabled={_disabled}>
      <ChakraButton
        aria-label={title}
        isLoading={state.loading}
        disabled={_disabled}
        {...rest}
      />
    </ButtonWrapper>
  );
};

export { Button };
