import type { ImageTableEntity } from './ImageTable.entity';

export interface RecipeTableEntity {
  id: number;
  name?: string;
  image_id?: ImageTableEntity['id'];
  /** markdown */
  description?: string;
  /** Каллорийность блюда на 100гр */
  kcal?: number;
  /** Вес одной порции блюда в граммах */
  portion_weight_in_grams?: number;
  /** Время на приготовление блюда в минутах */
  cooking_time_in_minutes?: number;
}
