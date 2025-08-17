import { useMemo } from 'react';
import { ValidationError } from 'yup';
import { useTranslation } from '~/shared/locale';
import { transformYupErrorsIntoObject, useAppForm } from '~/shared/ui';
import { NewRecipe } from './NewRecipe';

export function useNewRecipeForm() {
  const { t } = useTranslation('widgets/recipe', {
    keyPrefix: 'CreateRecipeDialog.form.validation',
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
        portionWeightInGrams: {
          min: (min) => t('portionWeightInGrams.min', { min }),
          max: (max) => t('portionWeightInGrams.min', { max }),
        },
        cookingTimeInMinutes: {
          min: (min) => t('cookingTimeInMinutes.min', { min }),
          max: (max) => t('cookingTimeInMinutes.min', { max }),
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
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
}
