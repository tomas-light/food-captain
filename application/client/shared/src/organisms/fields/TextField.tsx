import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ReactNode } from 'react';
import classes from './TextField.module.scss';

type Props = {
  className?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
  disabled?: boolean;
};

function TextField(props: Props) {
  const { className, label, value, onChange, icon, disabled = false } = props;

  return (
    <InputGroup className={className}>
      {icon && <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>}
      <Input
        className={classes.input}
        placeholder={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        isDisabled={disabled}
      />
    </InputGroup>
  );
}

export { TextField };
export type { Props as TextFieldProps };
