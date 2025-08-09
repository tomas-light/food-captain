import type { ImageTableEntity } from './ImageTable.entity';

/** Ингредиент блюда. То, из чего формируется рецепт (соль, перец, курица и т.д.) */
export interface IngredientTableEntity {
  id: number;
  name?: string;
  image_id?: ImageTableEntity['id'];

  /** iso */
  created_at: string;
}
