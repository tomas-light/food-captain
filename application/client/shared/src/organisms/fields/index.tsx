import { TextAreaField, TextAreaFieldProps } from './TextAreaField';
import { TextField, TextFieldProps } from './TextField';
import { SelectField, SelectFieldProps } from './SelectField';
import { MultiSelectField, MultiSelectFieldProps } from './MultiSelectField';
import { NumberField, NumberFieldProps } from './NumberField';
import { Option } from './Option';

type FieldVariant =
  // | 'checkbox'
  // | 'date'
  | 'select'
  | 'multi-select'
  | 'number'
  // | 'radio-button'
  | 'text-area'
  | 'text';

type FieldPropsVariant<
  TFieldVariant extends FieldVariant = 'text',
  TOption extends Option = Option
> = TFieldVariant extends 'select'
  ? SelectFieldProps<TOption>
  : TFieldVariant extends 'multi-select'
  ? MultiSelectFieldProps<TOption>
  : TFieldVariant extends 'number'
  ? NumberFieldProps
  : TFieldVariant extends 'text-area'
  ? TextAreaFieldProps
  : TFieldVariant extends 'text'
  ? TextFieldProps
  : never;

type Props<
  TFieldVariant extends FieldVariant = 'text',
  TOption extends Option = Option
> = {
  variant?: TFieldVariant;
} & FieldPropsVariant<TFieldVariant, TOption>;

function Field<
  TFieldVariant extends FieldVariant = 'text',
  TOption extends Option = Option
>(props: Props<TFieldVariant, TOption>) {
  const { variant = 'text', ...rest } = props;

  switch (variant) {
    case 'select':
      return (
        <SelectField {...(rest as unknown as SelectFieldProps<TOption>)} />
      );

    case 'multi-select':
      return (
        <MultiSelectField
          {...(rest as unknown as MultiSelectFieldProps<TOption>)}
        />
      );

    case 'number':
      return <NumberField {...(rest as unknown as NumberFieldProps)} />;

    case 'text-area':
      return <TextAreaField {...(rest as unknown as TextAreaFieldProps)} />;

    case 'text':
    default:
      return <TextField {...(rest as unknown as TextFieldProps)} />;
  }
}

export { Field };
export type { Props as FieldProps, Option };
