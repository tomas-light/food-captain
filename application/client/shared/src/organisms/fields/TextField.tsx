import { Input, FormLabel, FormControl } from '@chakra-ui/react';

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function TextField(props: Props) {
  const { label, value, onChange } = props;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input
        placeholder={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </FormControl>
  );
}

export { TextField };
export type { Props as TextFieldProps };
