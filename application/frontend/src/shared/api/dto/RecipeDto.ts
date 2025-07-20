export interface RecipeDto {
  id: number;
  name?: string;
  image_url?: string;
  /** markdown */
  description?: string;
  /** Каллорийность блюда на 100гр */
  kcal?: number;
  /** Вес одной порции блюда в граммах */
  portion_weight_in_grams?: number;
  /** Время на приготовление блюда в минутах */
  cooking_time_in_minutes?: number;
}
