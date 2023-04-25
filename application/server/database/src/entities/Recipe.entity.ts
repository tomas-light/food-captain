import { Entity } from './Entity';

export interface RecipeDescription {
  blocks: RecipeDescriptionBlock[];
}

export interface RecipeDescriptionBlock {
  type: 'text' | 'step';
  order: number;
  content: any[]; // rich text format
}

export interface NewRecipeEntity extends Entity {
  name?: string;
  image_id?: number;
  description?: RecipeDescription;
  kcal?: number;
  portion_weight_in_grams?: number;
  cooking_time_in_minutes?: number;
}

export interface RecipeEntity extends NewRecipeEntity {
  id: number;
}
