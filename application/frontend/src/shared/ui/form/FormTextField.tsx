import { TextField, type TextFieldProps } from '../fields/TextField';
import { useFieldContext } from './appFormContext';
import { FieldValidationError } from './FieldValidationError';

type Props = Omit<
  TextFieldProps,
  'id' | 'name' | 'value' | 'onBlur' | 'onChange' | 'children'
>;

export function FormTextField(props: Props) {
  const { label, ...textFieldProps } = props;

  const field = useFieldContext<string>();

  return (
    <TextField
      label={label}
      id={field.name}
      name={field.name}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(event) => field.handleChange(event.target.value)}
      {...textFieldProps}
    >
      <FieldValidationError field={field} />
    </TextField>
  );
}
