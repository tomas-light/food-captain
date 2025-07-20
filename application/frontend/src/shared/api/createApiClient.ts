import axios from 'axios';
import { type ApiClient } from './ApiClient';
import { AuthApiClient } from './real/AuthApiClient';
import { DimensionApiClient } from './real/DimensionApiClient';
import { ImageApiClient } from './real/ImageApiClient';
import { IngredientApiClient } from './real/IngredientApiClient';
import { MenuApiClient } from './real/MenuApiClient';
import { RecipeApiClient } from './real/RecipeApiClient';
import { TagApiClient } from './real/TagApiClient';
import { UserApiClient } from './real/UserApiClient';

export const createApiClient = (baseUrl: string): ApiClient => {
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
  });

  const auth = new AuthApiClient(axiosInstance);
  const dimension = new DimensionApiClient(axiosInstance);
  const image = new ImageApiClient(axiosInstance);
  const ingredient = new IngredientApiClient(axiosInstance);
  const menu = new MenuApiClient(axiosInstance);
  const recipe = new RecipeApiClient(axiosInstance);
  const tag = new TagApiClient(axiosInstance);
  const user = new UserApiClient(axiosInstance);

  return {
    auth,
    dimension,
    image,
    ingredient,
    menu,
    recipe,
    tag,
    user,
  };
};
