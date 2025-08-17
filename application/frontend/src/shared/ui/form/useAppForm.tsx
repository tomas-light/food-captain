import { createFormHook } from '@tanstack/react-form';
import { lazy, Suspense, type ComponentProps } from 'react';
import { TextFieldSkeleton } from '../fields/TextFieldSkeleton';
import { fieldContext, formContext } from './appFormContext';
import { FormSubmitButton } from './FormSubmitButton';

const FormTextField = lazy(async () => ({
  default: (await import('./FormTextField')).FormTextField,
}));
const FormNumberField = lazy(async () => ({
  default: (await import('./FormNumberField')).FormNumberField,
}));

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    Text: function LazyFormTextField(
      props: ComponentProps<typeof FormTextField>
    ) {
      return (
        <Suspense fallback={<TextFieldSkeleton />}>
          <FormTextField {...props} />
        </Suspense>
      );
    },
    Number: function LazyFormNumberField(
      props: ComponentProps<typeof FormNumberField>
    ) {
      return (
        <Suspense fallback={<TextFieldSkeleton />}>
          <FormNumberField {...props} />
        </Suspense>
      );
    },
  },
  formComponents: {
    SubmitButton: FormSubmitButton,
  },
});
