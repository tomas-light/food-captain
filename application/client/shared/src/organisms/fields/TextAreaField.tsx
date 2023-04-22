import { InputGroup, InputLeftElement, Textarea } from '@chakra-ui/react';
import { ReactNode } from 'react';
import classes from './TextAreaField.module.scss';

type Props = {
  className?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
  disabled?: boolean;
};

function TextAreaField(props: Props) {
  const {
    className,
    label,
    value,
    onChange,
    icon,
    disabled = false,
    ...rest
  } = props;

  return (
    <InputGroup className={className}>
      {icon && <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>}
      <Textarea
        className={classes.input}
        placeholder={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        isDisabled={disabled}
        {...rest}
      />
    </InputGroup>
  );
}

export { TextAreaField };
export type { Props as TextAreaFieldProps };
