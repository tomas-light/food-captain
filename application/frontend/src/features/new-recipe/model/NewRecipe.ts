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
}
