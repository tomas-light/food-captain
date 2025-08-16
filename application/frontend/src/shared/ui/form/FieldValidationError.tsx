import type { AnyFieldApi } from '@tanstack/react-form';

type Props = {
  field: AnyFieldApi;
};

export function FieldValidationError(props: Props) {
  const { field } = props;
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(', ')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}
