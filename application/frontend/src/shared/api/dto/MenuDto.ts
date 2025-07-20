import type { UserDto } from './UserDto';

export interface MenuDto {
  id: number;
  name?: string;
  /** iso */
  create_date: string;
  /** iso */
  last_update?: string;
  author?: UserDto;
  order_number?: number;
}
