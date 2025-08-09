import type { UserDto } from './UserDto';

export interface MenuDto {
  id: number;
  name?: string;
  /** iso */
  created_at: string;
  /** iso */
  last_update?: string;
  author?: UserDto;
  order_number?: number;
}
