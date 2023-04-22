import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import classes from './TextField.module.scss';

type Props = Pick<InputProps, 'variant'> & {
  className?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
  disabled?: boolean;
  autoFocus?: boolean;
};

function TextField(props: Props) {
  const {
    className,
    label,
    value,
    onChange,
    icon,
    disabled = false,
    autoFocus = false,
    ...rest
  } = props;

  return (
    <InputGroup className={className}>
      {icon && <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>}
      <Input
        className={classes.input}
        placeholder={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        isDisabled={disabled}
        autoFocus={autoFocus}
        {...rest}
      />
    </InputGroup>
  );
}

export { TextField };
export type { Props as TextFieldProps };
