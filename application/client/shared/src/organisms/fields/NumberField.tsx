import {
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = Pick<InputGroupProps, 'size'> & {
  className?: string;
  placeholder?: string;
  value: number;
  onChange: (value: number | null) => void;
  prefix?: ReactNode;
  suffix?: string;
};

function NumberField(props: Props) {
  const {
    //
    size,
    className,
    placeholder,
    value,
    onChange,
    prefix,
    suffix,
  } = props;

  return (
    <InputGroup className={className} size={size}>
      {prefix && (
        <InputLeftElement pointerEvents="none">{prefix}</InputLeftElement>
      )}
      <Input
        placeholder={placeholder}
        value={value}
        step={1}
        type={'number'}
        variant={'flushed'}
        onChange={(event) => {
          const newValue = event.target.value;
          const parsed = parseInt(newValue, 10);
          if (isNaN(parsed)) {
            onChange(null);
          } else {
            onChange(parsed);
          }
        }}
      />

      {suffix && (
        <InputRightElement pointerEvents="none">{suffix}</InputRightElement>
      )}
    </InputGroup>
  );
}

export { NumberField };
export type { Props as NumberFieldProps };
