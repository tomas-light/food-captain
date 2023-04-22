import {
  NewRecipeDto,
  RecipeForViewDto,
  UpdatedRecipeDto,
  RecipeIngredientDto,
} from '@food-captain/api';

export interface Recipe extends RecipeForViewDto {}
export interface NewRecipe extends NewRecipeDto {
  ingredients: RecipeIngredient[];
}
export interface UpdatedRecipe extends UpdatedRecipeDto {
  ingredients: RecipeIngredient[];
}
export interface RecipeIngredient extends RecipeIngredientDto {}
