import { useMemo } from 'react';
import * as yup from 'yup';
import { useTranslation } from '~/shared/locale';
import { type NewRecipe } from './NewRecipe';

export function useNewRecipeValidationSchema() {
  const { t } = useTranslation('features/new-recipe', {
    keyPrefix: 'validation',
  });

  return useMemo(
    () =>
      yup.object<NewRecipe>().shape({
        name: yup
          .string()
          .required(t('name.required'))
          .max(255, ({ max, value }) =>
            t('name.maxLength', {
              length: value?.length ?? 0,
              maxLength: max,
            })
          ),

        imageFile: yup.object().optional(),

        description: yup
          .string()
          .optional()
          .max(500, ({ max, value }) =>
            t('description.maxLength', {
              length: value?.length ?? 0,
              maxLength: max,
            })
          ),

        formula: yup
          .string()
          .required(t('formula.required'))
          .max(25000, ({ max, value }) =>
            t('formula.maxLength', {
              length: value?.length ?? 0,
              maxLength: max,
            })
          ),

        kcal: yup
          .number()
          .optional()
          .min(0, ({ min }) => t('kcal.min', { min }))
          .max(10000, ({ max }) => t('kcal.max', { max })),

        portionWeightInGrams: yup
          .number()
          .optional()
          .min(0, ({ min }) => t('portionWeight.min', { min }))
          .max(10000, ({ max }) => t('portionWeight.max', { max })),

        cookingTimeInMinutes: yup
          .number()
          .optional()
          .min(0, ({ min }) => t('cookingTime.min', { min }))
          .max(1000, ({ max }) => t('cookingTime.max', { max })),

        tagIds: yup.array(yup.number()).optional(),

        nutrition: yup
          .object<NewRecipe['nutrition']>()
          .shape({
            calories: yup.number().optional(),
            protein: yup.number().optional(),
            carbs: yup.number().optional(),
            fat: yup.number().optional(),
          })
          .optional(),
      }),
    [t]
  );
}
