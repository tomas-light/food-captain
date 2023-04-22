import {
  NewRecipeDto,
  RecipeForViewDto,
  UpdatedRecipeDto,
  RecipeIngredientDto,
  RecipeTagDto,
  RecipeDescriptionDto,
  RecipeDescriptionBlockDto,
} from '@food-captain/api';

export interface Recipe extends Omit<RecipeForViewDto, 'description'> {
  description?: RecipeDescription;
}
export interface NewRecipe extends Omit<NewRecipeDto, 'description'> {
  ingredients: RecipeIngredient[];
  description?: RecipeDescription;
}
export interface UpdatedRecipe extends Omit<UpdatedRecipeDto, 'description'> {
  ingredients: RecipeIngredient[];
  description?: RecipeDescription;
}
export interface RecipeIngredient extends RecipeIngredientDto {}
export interface RecipeTag extends RecipeTagDto {}

export interface RecipeDescription extends RecipeDescriptionDto {
  blocks: RecipeDescriptionBlock[];
}
export interface RecipeDescriptionBlock extends RecipeDescriptionBlockDto {
  reactId?: string;
}
