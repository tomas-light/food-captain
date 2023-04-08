import { Textarea, FormLabel, FormControl } from '@chakra-ui/react';

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function TextAreaField(props: Props) {
  const { label, value, onChange } = props;

  return (
    <FormLabel>
      <FormLabel>{label}</FormLabel>
      <Textarea
        placeholder={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </FormLabel>
  );
}

export { TextAreaField };
export type { Props as TextAreaFieldProps };
