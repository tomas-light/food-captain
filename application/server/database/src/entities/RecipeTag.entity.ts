import { Entity } from './Entity';

export interface RecipeTagEntity extends Entity {
  recipe_id: number;
  tag_id: number;
}
