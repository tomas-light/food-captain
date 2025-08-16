import type { ValidationError } from 'yup';

export function transformYupErrorsIntoObject(
  errors: ValidationError
): Record<string, string> {
  const validationErrors: Record<string, string> = {};

  errors.inner.forEach((error) => {
    if (error.path !== undefined) {
      validationErrors[error.path] = error.errors[0];
    }
  });

  return validationErrors;
}
