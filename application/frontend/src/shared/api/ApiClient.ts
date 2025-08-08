import { type AuthApi } from './real/AuthApi';
import { type DimensionApi } from './real/DimensionApi';
import { type ImageApi } from './real/ImageApi';
import { type IngredientApi } from './real/IngredientApi';
import { type MenuApi } from './real/MenuApi';
import { type RecipeApi } from './real/RecipeApi';
import { type TagApi } from './real/TagApi';
import { type UserApi } from './real/UserApi';

export interface ApiClient {
  auth: AuthApi;
  dimension: DimensionApi;
  image: ImageApi;
  ingredient: IngredientApi;
  menu: MenuApi;
  recipe: RecipeApi;
  tag: TagApi;
  user: UserApi;
}
