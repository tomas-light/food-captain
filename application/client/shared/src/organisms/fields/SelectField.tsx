import { FormControl, FormLabel } from '@chakra-ui/react';
import Select from 'react-select';
import { Option } from './Option';

type Props<TOption extends Option> = {
  label: string;
  value: TOption | null;
  options: TOption[];
  onChange: (value: TOption | null) => void;
};

function SelectField<TOption extends Option>(props: Props<TOption>) {
  const { label, value, options, onChange } = props;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Select options={options} onChange={onChange} value={value} />
    </FormControl>
  );
}

export { SelectField };
export type { Props as SelectFieldProps };
