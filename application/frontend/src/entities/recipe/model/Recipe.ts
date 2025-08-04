import type { Tag } from '~/entities/tag/crossExports';

export interface Recipe {
  id: number;
  name: string;
  imageUrl?: string;

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
}
