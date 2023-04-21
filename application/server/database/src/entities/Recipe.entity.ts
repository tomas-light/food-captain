import { Entity } from './Entity';

export interface RecipeDescription {
  type: 'text' | 'step';
  order: number;
  content: string; // todo: rich text format?
}

export interface RecipeEntity extends Entity {
  id: number;
  name?: string;
  image_id?: number;
  description?: RecipeDescription;
  kcal?: string;
  portion_weight_in_grams?: number;
  cooking_time_in_minutes?: number;
}

export interface NewRecipeEntity extends Omit<RecipeEntity, 'id'> {}
