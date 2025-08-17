import { NumberField, type NumberFieldProps } from '../fields/NumberField';
import { useFieldContext } from './appFormContext';
import { FieldValidationError } from './FieldValidationError';

type Props = Omit<
  NumberFieldProps,
  'id' | 'name' | 'value' | 'onBlur' | 'onChange' | 'children'
>;

export function FormNumberField(props: Props) {
  const { label, ...textFieldProps } = props;

  const field = useFieldContext<number | undefined>();

  return (
    <NumberField
      label={label}
      id={field.name}
      name={field.name}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(event) => {
        const value = event.target.value.trim();
        const numberValue = parseInt(value);
        if (isNaN(numberValue)) {
          field.handleChange(undefined);
        } else {
          field.handleChange(numberValue);
        }
      }}
      {...textFieldProps}
    >
      <FieldValidationError field={field} />
    </NumberField>
  );
}
