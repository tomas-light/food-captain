export interface DimensionDto {
  id: number;
  name: string;
  /** Сокращение к названию, например, "л" для литров и "гр" для грамм */
  short_name: string;
}
