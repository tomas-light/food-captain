import axios from 'axios';
import { type ApiClient } from './ApiClient';
import { AuthApi } from './real/AuthApi';
import { DimensionApi } from './real/DimensionApi';
import { ImageApi } from './real/ImageApi';
import { IngredientApi } from './real/IngredientApi';
import { MenuApi } from './real/MenuApi';
import { RecipeApi } from './real/RecipeApi';
import { TagApi } from './real/TagApi';
import { UserApi } from './real/UserApi';

export const createApiClient = (baseUrl: string): ApiClient => {
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
  });

  const auth = new AuthApi(axiosInstance);
  const dimension = new DimensionApi(axiosInstance);
  const image = new ImageApi(axiosInstance);
  const ingredient = new IngredientApi(axiosInstance);
  const menu = new MenuApi(axiosInstance);
  const recipe = new RecipeApi(axiosInstance);
  const tag = new TagApi(axiosInstance);
  const user = new UserApi(axiosInstance);

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
