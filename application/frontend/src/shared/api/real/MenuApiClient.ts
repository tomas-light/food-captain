import type { MenuDto } from '../dto/MenuDto';
import type { UserDto } from '../dto/UserDto';
import { ApiBaseClient, ContentType } from './ApiBaseClient';

export class MenuApiClient extends ApiBaseClient {
  getMenus = async () => {
    return this.request<MenuDto[]>({
      method: 'GET',
      url: '/menus',
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  getMenusByIds = async (menuIds: MenuDto['id'][]) => {
    return this.request<MenuDto[]>({
      method: 'GET',
      url: '/menus',
      query: { menu_ids: menuIds },
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  getMenuById = async (menuId: MenuDto['id']) => {
    return this.request<MenuDto>({
      method: 'GET',
      url: `/menu/${menuId}`,
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  addMenu = async (menu: {
    name?: string;
    author_id?: UserDto['id'];
    order_number?: number;
  }) => {
    return this.request<MenuDto>({
      method: 'POST',
      url: '/menu',
      data: JSON.stringify(menu),
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  updateMenu = async (menu: {
    id: MenuDto['id'];
    name?: string;
    order_number?: number;
  }) => {
    return this.request<MenuDto>({
      method: 'PUT',
      url: `/menu/${menu.id}`,
      data: JSON.stringify(menu),
      type: ContentType.Json,
      responseType: 'json',
    });
  };

  deleteMenu = async (menuId: MenuDto['id']) => {
    return this.request<MenuDto>({
      method: 'DELETE',
      url: `/menu/${menuId}`,
      type: ContentType.Json,
      responseType: 'json',
    });
  };
}
