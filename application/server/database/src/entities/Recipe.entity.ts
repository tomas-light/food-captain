import { Entity } from './Entity';

export interface RecipeEntity extends Entity {
  id: number;
  name?: string;
  dish_id: number;
  image_id?: number;
  description?: string;
}

export interface NewRecipeEntity extends Omit<RecipeEntity, 'id'> {}
