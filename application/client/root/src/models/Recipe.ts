import { Dish } from './Dish';
import { IngredientInRecipe } from './IngredientInRecipe';

export interface Recipe {
	id: string;
	dish: Dish;
	name?: string;
	image?: string;
	description?: string;
	images: string[];
	ingredients: IngredientInRecipe[];
}
