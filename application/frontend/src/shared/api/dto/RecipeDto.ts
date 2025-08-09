import type { TagDto } from './TagDto';
import type { UserDto } from './UserDto';

export interface RecipeDto {
  id: number;
  name: string;
  image_url?: string;

  /** краткое описание рецепта */
  description: string;

  /** пошаговая инструкция приготовления (в формате markdown) */
  formula: string;

  /** Калорийность блюда на 100гр */
  kcal?: number;

  /** Вес одной порции блюда в граммах */
  portion_weight_in_grams?: number;

  /** Время на приготовление блюда в минутах */
  cooking_time_in_minutes?: number;

  tag_ids: TagDto['id'][];

  nutrition: Partial<{
    /** Калорийность блюда на 100гр */
    calories: number;

    /** Белков на 100гр */
    protein: number;

    /** Углеводов на 100гр */
    carbs: number;

    /** Жиров на 100гр */
    fat: number;
  }>;

  author_id: UserDto['id'];

  /** iso */
  created_at: string;
}
