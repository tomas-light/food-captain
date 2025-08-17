import * as yup from 'yup';
import type { DishNutrition } from '~/entities/recipe';
import type { Tag } from '~/entities/tag';

export class NewRecipe {
  name: string;

  imageFile?: File;

  /** краткое описание рецепта */
  description: string;

  /** пошаговая инструкция приготовления (в формате markdown) */
  formula: string;

  /** Калорийность блюда на 100гр */
  kcal?: number;

  /** Вес одной порции блюда в граммах */
  portionWeightInGrams?: number;

  /** Время на приготовление блюда в минутах */
  cookingTimeInMinutes?: number;

  tagIds: Tag['id'][];

  nutrition: Partial<DishNutrition>;

  constructor() {
    this.name = '';
    this.description = '';
    this.formula = '';
    this.tagIds = [];
    this.nutrition = {};
  }

  static getValidationSchema = (resources: {
    name: {
      required: string;
      maxLength: (length: number, maxLength: number) => string;
    };
    description: {
      maxLength: (length: number, maxLength: number) => string;
    };
    formula: {
      required: string;
      maxLength: (length: number, maxLength: number) => string;
    };
    kcal: {
      min: (min: number) => string;
      max: (max: number) => string;
    };
    portionWeight: {
      min: (min: number) => string;
      max: (max: number) => string;
    };
    cookingTime: {
      min: (min: number) => string;
      max: (max: number) => string;
    };
  }) =>
    yup.object<NewRecipe>().shape({
      name: yup
        .string()
        .required(resources.name.required)
        .max(255, ({ max, value }) =>
          resources.name.maxLength(value?.length ?? 0, max)
        ),
      imageFile: yup.object().optional(),
      description: yup
        .string()
        .optional()
        .max(500, ({ max, value }) =>
          resources.description.maxLength(value?.length ?? 0, max)
        ),
      formula: yup
        .string()
        .required(resources.formula.required)
        .max(25000, ({ max, value }) =>
          resources.name.maxLength(value?.length ?? 0, max)
        ),
      kcal: yup
        .number()
        .optional()
        .min(0, ({ min }) => resources.kcal.min(min))
        .max(10000, ({ max }) => resources.kcal.max(max)),
      portionWeightInGrams: yup
        .number()
        .optional()
        .min(0, ({ min }) => resources.portionWeight.min(min))
        .max(10000, ({ max }) => resources.portionWeight.max(max)),
      cookingTimeInMinutes: yup
        .number()
        .optional()
        .min(0, ({ min }) => resources.cookingTime.min(min))
        .max(1000, ({ max }) => resources.cookingTime.max(max)),
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
    });
}
