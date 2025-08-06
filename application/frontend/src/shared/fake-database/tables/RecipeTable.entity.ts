import type { ImageTableEntity } from './ImageTable.entity';
import type { TagTableEntity } from './TagTable.entity';

export interface RecipeTableEntity {
  id: number;
  name: string;
  image_id?: ImageTableEntity['id'];

  /** краткое описание рецепта */
  description: string;

  /** пошаговая инструкция приготовления (в формате markdown) */
  formula: string;

  /** Вес одной порции блюда в граммах */
  portion_weight_in_grams?: number;

  /** Время на приготовление блюда в минутах */
  cooking_time_in_minutes?: number;

  tag_ids?: TagTableEntity['id'][];

  nutrition: Partial<{
    /** Калорийность блюда на 100гр */
    calories: number;

    /** Белков на 100гр */
    protein: number;

    /** Углеводов на 100гр */
    carbs: number;

    /** Жиров на 100гр */
    fat: number;

    /** Сахара на 100гр */
    sugar: number;
  }>;
}
