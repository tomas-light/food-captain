import { Entity } from './Entity';

export interface RecipeImageEntity extends Entity {
  recipe_id: number;
  image_id: number;
}
