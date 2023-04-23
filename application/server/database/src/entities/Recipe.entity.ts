import { Entity } from './Entity';

export interface RecipeDescription {
  blocks: RecipeDescriptionBlock[];
}

export interface RecipeDescriptionBlock {
  type: 'text' | 'step';
  order: number;
  content: any[]; // rich text format
}

export interface RecipeEntity extends Entity {
  id: number;
  name?: string;
  image_id?: number;
  description?: RecipeDescription;
  kcal?: number;
  portion_weight_in_grams?: number;
  cooking_time_in_minutes?: number;
}

export interface NewRecipeEntity extends Omit<RecipeEntity, 'id'> {}
