import { type AuthApiClient } from './real/AuthApiClient';
import { type DimensionApiClient } from './real/DimensionApiClient';
import { type ImageApiClient } from './real/ImageApiClient';
import { type IngredientApiClient } from './real/IngredientApiClient';
import { type MenuApiClient } from './real/MenuApiClient';
import { type RecipeApiClient } from './real/RecipeApiClient';
import { type TagApiClient } from './real/TagApiClient';
import { type UserApiClient } from './real/UserApiClient';

export interface ApiClient {
  auth: AuthApiClient;
  dimension: DimensionApiClient;
  image: ImageApiClient;
  ingredient: IngredientApiClient;
  menu: MenuApiClient;
  recipe: RecipeApiClient;
  tag: TagApiClient;
  user: UserApiClient;
}
