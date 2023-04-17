import {
  NewRecipeDto,
  RecipeWithIngredientsDto,
  UpdatedRecipeDto,
} from '@food-captain/api';

export interface Recipe extends RecipeWithIngredientsDto {}
export interface NewRecipe extends NewRecipeDto {}
export interface UpdatedRecipe extends UpdatedRecipeDto {}
