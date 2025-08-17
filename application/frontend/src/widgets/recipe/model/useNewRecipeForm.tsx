import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { ValidationError } from 'yup';
import { useTranslation } from '~/shared/locale';
import { transformYupErrorsIntoObject, useAppForm } from '~/shared/ui';
import { useCreateRecipeMutation } from '../api/useCreateRecipeMutation';
import { NewRecipe } from './NewRecipe';

export function useNewRecipeForm(onSuccess?: VoidFunction) {
  const { t } = useTranslation('widgets/recipe', {
    keyPrefix: 'CreateRecipeDialog.form.validation',
  });
  const { t: tToast } = useTranslation('widgets/recipe', {
    keyPrefix: 'CreateRecipeDialog',
  });

  const { mutate: createRecipe } = useCreateRecipeMutation({
    onSuccess: () => {
      toast(tToast('successCreated'), {
        type: 'success',
      });
      onSuccess?.();
    },
  });

  const schema = useMemo(
    () =>
      NewRecipe.getValidationSchema({
        name: {
          required: t('name.required'),
          maxLength: (length, maxLength) =>
            t('name.maxLength', { length, maxLength }),
        },
        description: {
          maxLength: (length, maxLength) =>
            t('description.maxLength', { length, maxLength }),
        },
        formula: {
          required: t('formula.required'),
          maxLength: (length, maxLength) =>
            t('formula.maxLength', { length, maxLength }),
        },
        kcal: {
          min: (min) => t('kcal.min', { min }),
          max: (max) => t('kcal.min', { max }),
        },
        portionWeight: {
          min: (min) => t('portionWeight.min', { min }),
          max: (max) => t('portionWeight.min', { max }),
        },
        cookingTime: {
          min: (min) => t('cookingTime.min', { min }),
          max: (max) => t('cookingTime.min', { max }),
        },
      }),
    [t]
  );

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
