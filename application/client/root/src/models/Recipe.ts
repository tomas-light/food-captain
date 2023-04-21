import {
  NewRecipeDto,
  RecipeForViewDto,
  UpdatedRecipeDto,
} from '@food-captain/api';

export interface Recipe extends RecipeForViewDto {}
export interface NewRecipe extends NewRecipeDto {}
export interface UpdatedRecipe extends UpdatedRecipeDto {}
