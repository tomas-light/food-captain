import type { RecipeDto } from '~/shared/api';
import type { Recipe } from '../model/Recipe';

function selectRecipe(dto: undefined): null;
function selectRecipe(dto: RecipeDto): Recipe;
function selectRecipe(dto: RecipeDto | undefined) {
  if (!dto) {
    return null;
  }

  const recipe: Recipe = {
    id: dto.id,
    name: dto.name,
    imageUrl: dto.image_url,
    description: dto.description,
    formula: dto.formula,
    portionWeightInGrams: dto.portion_weight_in_grams,
    cookingTimeInMinutes: dto.cooking_time_in_minutes,
    tagIds: dto.tag_ids,
    nutrition: dto.nutrition,
  };
  return recipe;
}

export { selectRecipe };
