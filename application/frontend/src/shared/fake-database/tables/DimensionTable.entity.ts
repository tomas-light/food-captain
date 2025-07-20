/** В чем измеряются ингредиенты (кг, граммы, штуки, ложки, литры и т.д.) */
export interface DimensionTableEntity {
  id: number;
  name: string;
  /** Сокращение к названию, например, "л" для литров и "гр" для грамм */
  short_name: string;
}
