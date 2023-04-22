import Select, { Props as SelectProps } from 'react-select';
import { Option } from './Option';

type Props<TOption extends Option> = SelectProps<TOption, false> & {};

function SelectField<TOption extends Option>(props: Props<TOption>) {
  const { ...selectProps } = props;

  return <Select {...selectProps} />;
}

export { SelectField };
export type { Props as SelectFieldProps };
