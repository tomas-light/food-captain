import { Request, Response } from 'express';
import { api, delete_, get, post, put } from 'mvc-middleware';
import { NewRecipeEntity, RecipeEntity } from '@food-captain/database';
import { RecipeForViewEntity } from '@food-captain/database/src/tables';
import { Logger } from '@food-captain/server-utils';
import { NewImage } from '../services/ImageService';
import {
  IngredientForRecipe,
  RecipeService,
  TagForRecipe,
} from '../services/RecipeService';
import { MakeOptional } from '../utils/MakeOptional';
import BaseApiController from './BaseApiController';

@api
export default class RecipeApiController extends BaseApiController {
  constructor(
    private readonly recipeService: RecipeService,
    logger: Logger,
    request: Request,
    response: Response
  ) {
    super(logger, request, response);
  }

  @get('recipes')
  async getRecipesAsync() {
    const recipes = await this.recipeService.getAllAsync();
    return this.ok(recipes);
  }

  @get('recipe/:recipeId')
  async getByIdAsync(recipeId: string) {
    const id = parseInt(recipeId, 10);

    if (isNaN(id)) {
      return this.badRequest('Recipe id is invalid');
    }

    const recipe = await this.recipeService.getByIdAsync(id);
    if (!recipe) {
      return this.notFound('Recipe not found');
    }

    return this.ok(recipe);
  }

  @post('recipe')
  async addRecipeAsync(recipe: NewRecipeDto) {
    const createdRecipe = await this.recipeService.addAsync(recipe);
    return this.ok(createdRecipe);
  }

  @put('recipe/:recipeId')
  async updateRecipeAsync(recipeId: number, recipe: UpdatedRecipeDto) {
    const updatedRecipe = await this.recipeService.updateAsync(recipe);
    return this.ok(updatedRecipe);
  }

  @delete_('recipe/:recipeId')
  async deleteRecipeAsync(recipeId: number) {
    const recipe = await this.recipeService.getByIdAsync(recipeId);
    if (!recipe) {
      return this.notFound('Recipe not found');
    }

    const removed = await this.recipeService.deleteAsync(recipe);
    return this.ok({ removed });
  }
}

export interface RecipeDto extends RecipeEntity {}

export interface RecipeForViewDto extends RecipeForViewEntity {}

export interface NewRecipeDto extends NewRecipeEntity {
  image?: NewImage;
  ingredients: IngredientForRecipe[];
  tags: TagForRecipe[];
}

export interface UpdatedRecipeDto extends MakeOptional<RecipeEntity, 'name'> {
  image?: NewImage;
  ingredients: IngredientForRecipe[];
  tags: TagForRecipe[];
}
