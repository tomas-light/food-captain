import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';

type Props = {
  label: string;
  value: number;
  onChange: (value: number | null) => void;
};

function NumberField(props: Props) {
  const { label, value, onChange } = props;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <NumberInput
        placeholder={label}
        value={value}
        step={1}
        onChange={(newValue) => {
          const parsed = parseInt(newValue, 10);
          if (isNaN(parsed)) {
            onChange(null);
          } else {
            onChange(parsed);
          }
        }}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
}

export { NumberField };
export type { Props as NumberFieldProps };
