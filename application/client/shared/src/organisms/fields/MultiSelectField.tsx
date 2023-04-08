import { FormControl, FormLabel } from '@chakra-ui/react';
import Select from 'react-select';
import { Option } from './Option';

type Props<TOption extends Option> = {
  label: string;
  value: TOption[];
  options: TOption[];
  onChange: (value: readonly TOption[]) => void;
};

function MultiSelectField<TOption extends Option>(props: Props<TOption>) {
  const { label, value, options, onChange } = props;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Select isMulti options={options} onChange={onChange} value={value} />
    </FormControl>
  );
}

export { MultiSelectField };
export type { Props as MultiSelectFieldProps };
