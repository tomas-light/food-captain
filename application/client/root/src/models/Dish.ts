import { Recipe } from './Recipe';

export interface Dish {
	id: string;
	name: string;
	description?: string;
	recipe?: Recipe;
	image?: string;
	order?: number;
}
