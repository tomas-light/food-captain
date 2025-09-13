import { ValidationError } from 'yup';
import { transformYupErrorsIntoObject, useAppForm } from '~/shared/ui';
import { useCreateRecipeMutation } from '../api/useCreateRecipeMutation';
import { NewRecipe } from '../model/NewRecipe';
import { useNewRecipeValidationSchema } from '../model/useNewRecipeValidationSchema';

export function useNewRecipeForm(onSuccess?: VoidFunction) {
  const { mutate: createRecipe } = useCreateRecipeMutation({ onSuccess });

  const schema = useNewRecipeValidationSchema();

  return useAppForm({
    defaultValues: new NewRecipe(),
    validators: {
      onChangeAsync: async ({ value }) => {
        try {
          await schema.validate(value, {
            abortEarly: false,
          });
        } catch (validationError) {
          if (validationError instanceof ValidationError) {
            const errors = transformYupErrorsIntoObject(validationError);
            return {
              fields: errors,
            };
          }
        }
      },
      onSubmitAsync: async ({ value }) => {
        try {
          await schema.validate(value, {
            abortEarly: false,
          });
        } catch (validationError) {
          if (validationError instanceof ValidationError) {
            const errors = transformYupErrorsIntoObject(validationError);
            return {
              fields: errors,
            };
          }
        }
      },
    },
    onSubmit: async ({ value }) => {
      createRecipe(value);
    },
  });
}
