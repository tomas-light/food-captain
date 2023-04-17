import type { Request, Response } from 'express';
import { api, delete_, get, post, put } from 'mvc-middleware';
import { IngredientEntity, NewIngredientEntity } from '@food-captain/database';
import { Logger } from '@food-captain/server-utils';
import { IngredientService } from '../services/IngredientService';
import BaseApiController from './BaseApiController';

@api
export default class IngredientApiController extends BaseApiController {
  constructor(
    private readonly ingredientService: IngredientService,
    logger: Logger,
    request: Request,
    response: Response
  ) {
    super(logger, request, response);
  }

  @get('ingredients')
  async getAllAsync() {
    const ingredients = await this.ingredientService.getAllAsync();
    return this.ok(ingredients);
  }

  @post('ingredients-by-ids')
  async getManyAsync(ingredientIds: IngredientEntity['id'][]) {
    const ingredients = await this.ingredientService.getManyAsync(
      ingredientIds
    );
    return this.ok(ingredients);
  }

  @get('ingredient/:ingredientId')
  async getByIdAsync(ingredientId: string) {
    const id = parseInt(ingredientId, 10);

    if (isNaN(id)) {
      return this.badRequest('Ingredient id is invalid');
    }

    const ingredient = await this.ingredientService.getByIdAsync(id);
    if (!ingredient) {
      return this.notFound('Ingredient not found');
    }

    return this.ok(ingredient);
  }

  // @get('ingredients/recipe/:recipeId')
  // async getByRecipeIdAsync(recipeId: string) {
  //   const id = parseInt(recipeId, 10);
  //
  //   if (isNaN(id)) {
  //     return this.badRequest('Recipe id is invalid');
  //   }
  //
  //   const ingredients = await this.ingredientService.getByRecipeIdAsync(id);
  //   return this.ok(ingredients);
  // }

  @post('ingredient')
  async addAsync(newIngredient: NewIngredientDto) {
    const createdIngredient = await this.ingredientService.addAsync(
      newIngredient
    );
    return this.ok(createdIngredient);
  }

  @put('ingredient/:ingredientId')
  async updateAsync(ingredientId: string, ingredient: IngredientDto) {
    const updatedIngredient = await this.ingredientService.updateAsync(
      ingredient
    );
    if (!updatedIngredient) {
      return this.notFound('Ingredient not found');
    }
    return this.ok(updatedIngredient);
  }

  @delete_('ingredient/:ingredientId')
  async deleteAsync(ingredientId: string) {
    const id = parseInt(ingredientId, 10);

    if (isNaN(id)) {
      return this.badRequest('Ingredient id is invalid');
    }

    const removed = await this.ingredientService.deleteByIdAsync(id);
    return this.ok({ removed });
  }
}

export interface IngredientDto extends IngredientEntity {}
export interface NewIngredientDto extends NewIngredientEntity {}
