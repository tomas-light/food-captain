export interface Recipe {
  id: number;
  name: string;
  imageUrl?: string;

  /** markdown */
  description?: string;

  /** Каллорийность блюда на 100гр */
  kcal?: number;

  /** Вес одной порции блюда в граммах */
  portionWeightInGrams?: number;

  /** Время на приготовление блюда в минутах */
  cookingTimeInMinutes?: number;
}